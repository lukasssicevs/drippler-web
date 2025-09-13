import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Configuration
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent";

interface TryOnRequest {
  userImageUrl: string;
  clothingImageUrl: string;
  clothingName?: string;
}

interface GenerationRecord {
  id: string;
  user_id: string;
  user_image_url?: string;
  clothing_image_url?: string;
  generated_image_url: string;
  clothing_name?: string;
  created_at: string;
}

interface GeminiResponsePart {
  inlineData?: {
    data: string;
    mimeType: string;
  };
}

/**
 * POST /api/virtual-try-on
 * Generates a virtual try-on image using Google Gemini API
 */
export async function POST(request: NextRequest) {
  try {
    // Verify API key exists
    const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: "Google Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Parse request body
    const body: TryOnRequest = await request.json();
    const {
      userImageUrl,
      clothingImageUrl,
      clothingName = "clothing item",
    } = body;

    if (!userImageUrl || !clothingImageUrl) {
      return NextResponse.json(
        { error: "Both user image and clothing image URLs are required" },
        { status: 400 }
      );
    }

    // Get authentication token from custom header
    const authToken = request.headers.get("X-Supabase-Auth");
    if (!authToken) {
      return NextResponse.json(
        { error: "Authentication token required" },
        { status: 401 }
      );
    }

    // Initialize Supabase client with user's access token
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      }
    );

    // Verify the access token
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authToken);
    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    const userId = user.id;

    // Check user's plan and generation limits using the new database schema
    const { data: planInfo, error: planError } = await supabase.rpc(
      "get_user_plan_info",
      { p_user_id: userId }
    );

    if (planError) {
      console.error("Error checking plan info:", planError);
      return NextResponse.json(
        { error: "Failed to check generation limit" },
        { status: 500 }
      );
    }

    console.log("Plan info:", planInfo);

    const userPlan = planInfo?.[0] || {
      plan_type: "free",
      status: "free",
      monthly_limit: 15,
      current_count: 0,
      remaining_generations: 15,
      subscription_active: false,
    };

    // Check if user has exceeded their plan limit
    if (userPlan.remaining_generations <= 0) {
      return NextResponse.json(
        {
          error: "Generation limit exceeded",
          message: `You have reached your monthly limit of ${
            userPlan.monthly_limit
          } generations. ${
            userPlan.plan_type === "free"
              ? "Please upgrade to Pro for 200 monthly generations."
              : "Your Pro limit will reset next month."
          }`,
          generationCount: userPlan.current_count,
          maxGenerations: userPlan.monthly_limit,
          remainingGenerations: 0,
          planType: userPlan.plan_type,
        },
        { status: 402 } // Payment Required
      );
    }

    // Fetch and convert images to base64
    const [userImageBase64, clothingImageBase64] = await Promise.all([
      fetchImageAsBase64(userImageUrl),
      fetchImageAsBase64(clothingImageUrl),
    ]);

    console.log("Base64 conversion complete:", {
      userImageSize: userImageBase64.data.length,
      clothingImageSize: clothingImageBase64.data.length,
      userMimeType: userImageBase64.mimeType,
      clothingMimeType: clothingImageBase64.mimeType,
    });

    // Generate the prompt for virtual try-on
    const prompt = generateTryOnPrompt(clothingName);
    console.log("Generated prompt:", prompt);

    // Prepare the request payload for Google Gemini API
    const requestBody = {
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: userImageBase64.mimeType,
                data: userImageBase64.data,
              },
            },
            {
              inlineData: {
                mimeType: clothingImageBase64.mimeType,
                data: clothingImageBase64.data,
              },
            },
          ],
        },
      ],
    };

    // Make the API request to Google Gemini
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "x-goog-api-key": geminiApiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Google Gemini API error:", response.status, errorText);
      console.error(
        "Request body that failed:",
        JSON.stringify(requestBody, null, 2)
      );

      // Check for prohibited content specifically
      if (
        errorText.includes("PROHIBITED_CONTENT") ||
        errorText.includes("prohibited")
      ) {
        return NextResponse.json(
          {
            error: "Content flagged as inappropriate by AI service",
            details: errorText,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          error: `AI generation failed: ${response.status} ${response.statusText}`,
          details: errorText,
        },
        { status: 500 }
      );
    }

    const responseData = await response.json();
    console.log("Got response data", responseData);

    // Extract the generated image from the response
    const candidate = responseData.candidates?.[0];
    if (!candidate) {
      return NextResponse.json(
        { error: "No candidates in AI response" },
        { status: 500 }
      );
    }

    // Check if content was flagged as prohibited
    if (candidate.finishReason === "PROHIBITED_CONTENT") {
      console.error("Content flagged as prohibited by Gemini API");
      return NextResponse.json(
        {
          error: "Content flagged as inappropriate by AI service",
          details:
            "The images or request were flagged by Google's content policy",
        },
        { status: 400 }
      );
    }

    // Check if candidate has content before accessing parts
    if (!candidate.content || !candidate.content.parts) {
      return NextResponse.json(
        {
          error: "Invalid response structure from AI service",
          details: `Finish reason: ${candidate.finishReason || "unknown"}`,
        },
        { status: 500 }
      );
    }

    // Find the image part in the response
    const imagePart = candidate.content.parts.find(
      (part: GeminiResponsePart) => part.inlineData
    );
    if (!imagePart) {
      return NextResponse.json(
        { error: "No image data in AI response" },
        { status: 500 }
      );
    }

    // Convert base64 back to buffer for storage
    const imageBase64 = imagePart.inlineData.data;
    const imageBuffer = Buffer.from(imageBase64, "base64");
    const imageMimeType = imagePart.inlineData.mimeType || "image/jpeg";

    // Create a file name for the generated image
    const timestamp = Date.now();
    const fileExtension = imageMimeType.split("/")[1] || "jpg";
    const fileName = `virtual-try-on-${userId}-${timestamp}.${fileExtension}`;

    // Upload generated image to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("virtual-try-on-generations")
      .upload(fileName, imageBuffer, {
        contentType: imageMimeType,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Error uploading generated image:", uploadError);
      return NextResponse.json(
        { error: "Failed to store generated image" },
        { status: 500 }
      );
    }

    // Get public URL for the generated image
    const { data: publicUrlData } = supabase.storage
      .from("virtual-try-on-generations")
      .getPublicUrl(fileName);

    // Record the generation using the new tracking system
    const { error: recordError } = await supabase.rpc(
      "record_user_generation",
      {
        p_user_id: userId,
        p_generation_type: "virtual_tryon",
        p_metadata: {
          user_image_url: userImageUrl,
          clothing_image_url: clothingImageUrl,
          generated_image_url: publicUrlData.publicUrl,
          clothing_name: clothingName,
        },
      }
    );

    if (recordError) {
      console.error("Error recording generation:", recordError);
      return NextResponse.json(
        {
          error:
            "Failed to record generation. You may have exceeded your limit.",
        },
        { status: 402 }
      );
    }

    // Also save to the legacy table for backward compatibility
    const generationRecord: Omit<GenerationRecord, "id" | "created_at"> = {
      user_id: userId,
      user_image_url: userImageUrl,
      clothing_image_url: clothingImageUrl,
      generated_image_url: publicUrlData.publicUrl,
      clothing_name: clothingName,
    };

    const { data: insertData, error: insertError } = await supabase
      .from("virtual_try_on_generations")
      .insert(generationRecord)
      .select()
      .single();

    if (insertError) {
      console.error("Error saving legacy generation record:", insertError);
      // Don't fail if legacy insert fails, but log it
    }

    // Get updated plan info after recording the generation
    const { data: updatedPlanInfo } = await supabase.rpc("get_user_plan_info", {
      p_user_id: userId,
    });

    const updatedPlan = updatedPlanInfo?.[0] || userPlan;

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        generatedImageUrl: publicUrlData.publicUrl,
        generatedImageBase64: imageBase64,
        generationId: insertData?.id,
        generationCount: updatedPlan.current_count,
        remainingGenerations: updatedPlan.remaining_generations,
        monthlyLimit: updatedPlan.monthly_limit,
        planType: updatedPlan.plan_type,
      },
      message: "Virtual try-on generated successfully",
    });
  } catch (error) {
    console.error("Virtual try-on API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/virtual-try-on
 * Get user's generation history and remaining count
 */
export async function GET(request: NextRequest) {
  try {
    // Get authentication token from custom header
    const authToken = request.headers.get("X-Supabase-Auth");
    if (!authToken) {
      return NextResponse.json(
        { error: "Authentication token required" },
        { status: 401 }
      );
    }

    // Initialize Supabase client with user's access token
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      }
    );

    // Verify the access token
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authToken);
    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    const userId = user.id;

    // Get user's plan info and generation stats using the new system
    const { data: planInfo, error: planError } = await supabase.rpc(
      "get_user_plan_info",
      { p_user_id: userId }
    );

    if (planError) {
      console.error("Error checking plan info:", planError);
      return NextResponse.json(
        { error: "Failed to check generation limit" },
        { status: 500 }
      );
    }

    const userPlan = planInfo?.[0] || {
      plan_type: "free",
      status: "free",
      monthly_limit: 15,
      current_count: 0,
      remaining_generations: 15,
      subscription_active: false,
    };

    // Get user's generation history from legacy table for display
    const { data: generations, error: fetchError } = await supabase
      .from("virtual_try_on_generations")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (fetchError) {
      console.error("Error fetching generations:", fetchError);
      return NextResponse.json(
        { error: "Failed to fetch generation history" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        generations: generations || [],
        generationCount: userPlan.current_count,
        maxGenerations: userPlan.monthly_limit,
        remainingGenerations: userPlan.remaining_generations,
        hasReachedLimit: userPlan.remaining_generations <= 0,
        planType: userPlan.plan_type,
        subscriptionActive: userPlan.subscription_active,
      },
    });
  } catch (error) {
    console.error("Virtual try-on GET API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

/**
 * Generates an appropriate prompt for virtual try-on
 */
function generateTryOnPrompt(clothingName: string): string {
  // Clean up the clothing name to avoid potential content flags
  let cleanName = clothingName.toLowerCase().trim();

  // Remove problematic patterns that might trigger content filters
  if (
    cleanName.includes("from www.") ||
    cleanName.includes("google.com") ||
    cleanName.length < 3
  ) {
    cleanName = "clothing item";
  }

  // Use a more natural, less robotic prompt
  return `Show the person from the first image wearing the ${cleanName} from the second image. Make sure the ${cleanName} fits naturally on the person.`;
}

/**
 * Fetches an image from URL and converts it to base64
 */
async function fetchImageAsBase64(
  imageUrl: string
): Promise<{ data: string; mimeType: string }> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }

    // Get MIME type from response headers or infer from URL
    const mimeType =
      response.headers.get("content-type") ||
      getMimeTypeFromUrl(imageUrl) ||
      "image/jpeg";

    const arrayBuffer = await response.arrayBuffer();

    // Convert to base64 using Node.js Buffer (server-side equivalent of FileReader)
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return {
      data: base64,
      mimeType,
    };
  } catch (error) {
    console.error(`Error fetching image from ${imageUrl}:`, error);
    throw error;
  }
}

/**
 * Gets MIME type from URL extension
 */
function getMimeTypeFromUrl(url: string): string | null {
  const extension = url.split(".").pop()?.toLowerCase();
  const mimeTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
  };
  return mimeTypes[extension || ""] || null;
}
