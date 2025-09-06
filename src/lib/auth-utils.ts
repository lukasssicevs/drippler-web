import { supabase, isSupabaseConfigured } from "./supabase";

export const AuthMessages = {
  EMAIL_VERIFIED:
    "Email verified successfully! You can now close this tab and return to the extension.",
  PASSWORD_RESET_SUCCESS:
    "Password updated successfully! You can now close this tab and sign in to the extension.",
  PASSWORD_RESET_ERROR:
    "There was an error updating your password. Please try again.",
  EMAIL_VERIFICATION_ERROR:
    "There was an error verifying your email. Please try again.",
  INVALID_TOKEN: "Invalid or expired verification token.",
  ALREADY_VERIFIED: "Your email is already verified.",
  SESSION_ERROR: "Unable to retrieve session information.",
} as const;

export interface AuthPageProps {
  type: "email-verification" | "password-reset";
  token?: string;
  error?: string;
  success?: boolean;
}

export const handleEmailVerification = async () => {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message:
        "Supabase configuration is missing. Please set up environment variables.",
      error: "Configuration error",
    };
  }

  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      console.error("Email verification error:", error);
      return {
        success: false,
        message: AuthMessages.EMAIL_VERIFICATION_ERROR,
        error: error.message,
      };
    }

    if (session?.user) {
      // Check if email is confirmed
      if (session.user.email_confirmed_at) {
        return {
          success: true,
          message: AuthMessages.EMAIL_VERIFIED,
          user: session.user,
        };
      } else {
        return {
          success: false,
          message: AuthMessages.EMAIL_VERIFICATION_ERROR,
          error: "Email not confirmed",
        };
      }
    }

    return {
      success: false,
      message: AuthMessages.SESSION_ERROR,
    };
  } catch (err) {
    console.error("Unexpected error during email verification:", err);
    return {
      success: false,
      message: AuthMessages.EMAIL_VERIFICATION_ERROR,
      error: "Unexpected error occurred",
    };
  }
};

export const handlePasswordUpdate = async (newPassword: string) => {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      message:
        "Supabase configuration is missing. Please set up environment variables.",
      error: "Configuration error",
    };
  }

  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      console.error("Password update error:", error);
      return {
        success: false,
        message: AuthMessages.PASSWORD_RESET_ERROR,
        error: error.message,
      };
    }

    return {
      success: true,
      message: AuthMessages.PASSWORD_RESET_SUCCESS,
      user: data.user,
    };
  } catch (err) {
    console.error("Unexpected error during password update:", err);
    return {
      success: false,
      message: AuthMessages.PASSWORD_RESET_ERROR,
      error: "Unexpected error occurred",
    };
  }
};

export const getExtensionInfo = () => {
  return {
    extensionId: process.env.NEXT_PUBLIC_EXTENSION_ID || "",
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  };
};
