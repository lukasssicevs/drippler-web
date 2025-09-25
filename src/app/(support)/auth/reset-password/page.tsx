"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter, useSearchParams } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validSession, setValidSession] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Check if we have valid session for password reset
    const checkSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Session error:", error);
          setError(
            "Invalid or expired reset link. Please request a new password reset."
          );
          return;
        }

        if (session && session.user) {
          setValidSession(true);
          console.log("Valid reset session for:", session.user.email);
        } else {
          setError(
            "Invalid or expired reset link. Please request a new password reset."
          );
        }
      } catch (err) {
        console.error("Error checking session:", err);
        setError("Something went wrong. Please try again.");
      }
    };

    checkSession();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      });

      if (error) {
        throw error;
      }

      setMessage(
        "Password updated successfully! You can now sign in to the extension with your new password."
      );

      // Clear form
      setPassword("");
      setConfirmPassword("");

      // Optionally redirect after a delay
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error: unknown) {
      console.error("Error updating password:", error);
      setError(
        (error as Error).message ||
          "Failed to update password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!validSession) {
    return (
      <div className="p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Reset Password</h1>
          <div className="text-red-400">{error || "Loading..."}</div>
          <p className="text-gray-400 mt-4 text-sm">
            If you need a new reset link, please use the &quot;Forgot
            Password&quot; option in the Drippler extension.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">
          Reset Your Password
        </h1>
        <p className="text-gray-400">Enter your new password below</p>
      </div>

      {message && (
        <div className="mb-6 text-green-400 bg-green-500/10 p-4 text-sm">
          {message}
        </div>
      )}

      {error && <div className="mb-6 text-red-400 p-4 text-sm">{error}</div>}

      <form onSubmit={handleResetPassword} className="space-y-6">
        <div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-purple-500/10 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-purple-500/50 text-white placeholder-purple-300/50 focus:outline-purple-500 focus:bg-purple-500/15 hover:bg-purple-500/15 transition-colors"
            placeholder="New Password"
            required
            minLength={6}
            disabled={loading}
          />
        </div>

        <div>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 bg-purple-500/10 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-purple-500/50 text-white placeholder-purple-300/50 focus:outline-purple-500 focus:bg-purple-500/15 hover:bg-purple-500/15 transition-colors"
            placeholder="Confirm New Password"
            required
            minLength={6}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-purple-500/25 rounded-[10px] outline outline-1 outline-offset-[-1px] outline-purple-500 text-white font-medium hover:bg-purple-500/35 disabled:bg-purple-500/10 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Updating Password...
            </>
          ) : (
            "Update Password"
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400 text-sm">
          After updating your password, you can sign in to the Drippler
          extension with your new credentials.
        </p>
      </div>
    </div>
  );
}
