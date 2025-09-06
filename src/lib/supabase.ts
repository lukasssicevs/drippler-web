import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_anon_key";

// Only create client on client side or when environment variables are properly set
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return (
    supabaseUrl !== "https://placeholder.supabase.co" &&
    supabaseAnonKey !== "placeholder_anon_key" &&
    supabaseUrl.startsWith("https://") &&
    supabaseAnonKey.length > 20
  );
};

// Types for our auth flows
export interface AuthError {
  message: string;
  status?: number;
}

export interface AuthSuccess {
  message: string;
  redirectTo?: string;
}
