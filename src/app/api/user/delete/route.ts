import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(request: NextRequest) {
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
    const userSupabase = createClient(
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

    // Verify the access token and get user
    const {
      data: { user },
      error: authError,
    } = await userSupabase.auth.getUser(authToken);

    if (authError || !user) {
      return NextResponse.json(
        { error: "Invalid authentication token" },
        { status: 401 }
      );
    }

    console.log(`Deleting account for user: ${user.email}`);

    // Delete user account using service role (admin) client
    const { error: deleteError } = await supabase.auth.admin.deleteUser(
      user.id,
      true // shouldSoftDelete: false - permanent deletion
    );

    if (deleteError) {
      console.error("Failed to delete user account:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete account" },
        { status: 500 }
      );
    }

    console.log(`User account ${user.email} deleted successfully`);

    return NextResponse.json({
      success: true,
      message: "Account deleted successfully",
    });

  } catch (error) {
    console.error("Delete account API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}