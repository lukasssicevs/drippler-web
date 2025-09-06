import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Interface for user metadata
interface UserMetadata {
  [key: string]: unknown;
  last_api_test?: string;
  test_counter?: number;
  api_source?: string;
  random_id?: string;
  custom_message?: string;
  message_updated_at?: string;
}

// Create a server-side Supabase client for token validation
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_anon_key";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("=== TOKEN VALIDATION API CALLED ===");
    console.log("Extension ID:", body.extensionId);
    console.log("Has access token:", !!body.accessToken);
    console.log("Has refresh token:", !!body.refreshToken);

    // Check if we received an access token
    if (!body.accessToken) {
      console.log("=== VALIDATION FAILURE ===");
      console.log("Reason: No access token provided");
      console.log("========================");

      return NextResponse.json({
        success: false,
        error: "No access token provided",
        timestamp: new Date().toISOString(),
      });
    }

    // Create Supabase client and set session with the provided token
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    try {
      // Validate the token by getting user information
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(body.accessToken);

      if (error) {
        console.log("=== TOKEN VALIDATION FAILURE ===");
        console.log("Error code:", error.status);
        console.log("Error message:", error.message);
        console.log(
          "Token (first 20 chars):",
          body.accessToken.substring(0, 20) + "..."
        );
        console.log("================================");

        return NextResponse.json({
          success: false,
          error: "Invalid token",
          details: error.message,
          timestamp: new Date().toISOString(),
        });
      }

      if (!user) {
        console.log("=== TOKEN VALIDATION FAILURE ===");
        console.log("Reason: Token valid but no user returned");
        console.log(
          "Token (first 20 chars):",
          body.accessToken.substring(0, 20) + "..."
        );
        console.log("================================");

        return NextResponse.json({
          success: false,
          error: "Token valid but no user found",
          timestamp: new Date().toISOString(),
        });
      }

      // Token is valid - log user data
      console.log("=== TOKEN VALIDATION SUCCESS ===");
      console.log("✅ Token is VALID");
      console.log("User ID:", user.id);
      console.log("Email:", user.email);
      console.log("Email confirmed:", !!user.email_confirmed_at);
      console.log("Email confirmed at:", user.email_confirmed_at);
      console.log("Phone:", user.phone || "Not provided");
      console.log("Created at:", user.created_at);
      console.log("Last sign in:", user.last_sign_in_at || "Never");
      console.log(
        "User metadata BEFORE update:",
        JSON.stringify(user.user_metadata, null, 2)
      );
      console.log("App metadata:", JSON.stringify(user.app_metadata, null, 2));

      // Update user metadata with test data and custom message
      const currentTime = new Date().toISOString();
      const testMetadata: UserMetadata = {
        ...user.user_metadata,
        last_api_test: currentTime,
        test_counter: ((user.user_metadata?.test_counter as number) || 0) + 1,
        api_source: "nextjs_backend",
        random_id: Math.random().toString(36).substring(7),
      };

      // Add custom message if provided
      if (body.customMessage) {
        testMetadata.custom_message = body.customMessage;
        testMetadata.message_updated_at = currentTime;
      }

      console.log("=== UPDATING USER METADATA ===");
      console.log("New metadata:", JSON.stringify(testMetadata, null, 2));

      try {
        // Create a new Supabase client with the user's session
        const supabaseWithAuth = createClient(supabaseUrl, supabaseAnonKey);

        console.log("Setting session with tokens...");
        console.log("Access token available:", !!body.accessToken);
        console.log("Refresh token available:", !!body.refreshToken);

        // Set the session using the access token and refresh token
        const { data: sessionData, error: sessionError } =
          await supabaseWithAuth.auth.setSession({
            access_token: body.accessToken,
            refresh_token: body.refreshToken || "",
          });

        if (sessionError) {
          console.log("❌ SESSION SET ERROR:");
          console.log("Session error:", sessionError.message);
          throw sessionError;
        }

        console.log("✅ Session set successfully");
        console.log("Session user:", sessionData.user?.email);

        // Update user metadata using the authenticated client
        const { data: updateData, error: updateError } =
          await supabaseWithAuth.auth.updateUser({
            data: testMetadata,
          });

        if (updateError) {
          console.log("❌ METADATA UPDATE FAILED:");
          console.log("Update error:", updateError.message);
        } else {
          console.log("✅ METADATA UPDATE SUCCESS");
          console.log(
            "Updated user metadata:",
            JSON.stringify(updateData.user?.user_metadata, null, 2)
          );
        }
      } catch (metadataError) {
        console.log("❌ METADATA UPDATE ERROR:");
        console.log("Error:", metadataError);
      }

      console.log("=== FULL USER OBJECT ===");
      console.log(JSON.stringify(user, null, 2));
      console.log("=======================");

      return NextResponse.json({
        success: true,
        message: "Token validated and metadata updated successfully",
        user: {
          id: user.id,
          email: user.email,
          emailConfirmed: !!user.email_confirmed_at,
          createdAt: user.created_at,
          lastSignIn: user.last_sign_in_at,
          metadata: testMetadata,
        },
        metadataUpdated: true,
        timestamp: new Date().toISOString(),
      });
    } catch (supabaseError) {
      console.log("=== SUPABASE ERROR ===");
      console.log("Error during token validation:", supabaseError);
      console.log(
        "Token (first 20 chars):",
        body.accessToken.substring(0, 20) + "..."
      );
      console.log("======================");

      return NextResponse.json(
        {
          success: false,
          error: "Supabase validation error",
          details:
            supabaseError instanceof Error
              ? supabaseError.message
              : "Unknown error",
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("=== API ERROR ===");
    console.error("Error:", error);
    console.error("=================");

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process request",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log("=== TEST API HEALTH CHECK ===");
  console.log("Test endpoint is working");
  console.log("Timestamp:", new Date().toISOString());
  console.log("=============================");

  return NextResponse.json({
    success: true,
    message: "Test API is working",
    timestamp: new Date().toISOString(),
    endpoint: "/api/test-user",
  });
}
