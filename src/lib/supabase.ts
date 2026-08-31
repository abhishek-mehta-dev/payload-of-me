import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

const PLACEHOLDER_URL = "https://placeholder.supabase.co";
const PLACEHOLDER_KEY = "placeholder-key";

/** True when real Supabase URL + anon key are set in env. */
export function isSupabaseConfigured(): boolean {
  return Boolean(
    supabaseUrl &&
      supabaseAnonKey &&
      supabaseUrl !== PLACEHOLDER_URL &&
      supabaseAnonKey !== PLACEHOLDER_KEY &&
      !supabaseUrl.includes("dummy.supabase.co") &&
      supabaseAnonKey !== "dummy_key",
  );
}

export function getSupabaseConfigError(): string | null {
  if (isSupabaseConfigured()) return null;

  const missing: string[] = [];
  if (!supabaseUrl) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!supabaseAnonKey) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");

  if (missing.length > 0) {
    return `Missing environment variables: ${missing.join(", ")}. Add them to .env.local and restart the dev server.`;
  }

  return "Supabase credentials look invalid. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local.";
}

function createPublicClient(): SupabaseClient {
  return createClient(
    supabaseUrl || PLACEHOLDER_URL,
    supabaseAnonKey || PLACEHOLDER_KEY,
  );
}

function createAdminClient(): SupabaseClient {
  const key = supabaseServiceRoleKey || supabaseAnonKey || PLACEHOLDER_KEY;
  return createClient(supabaseUrl || PLACEHOLDER_URL, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Public reads (published blogs, navbar count). */
export const supabase = createPublicClient();

/** Server-side writes / admin reads — prefers service role when set. */
export function getSupabaseAdmin(): SupabaseClient {
  return createAdminClient();
}

export function formatSupabaseError(error: {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
} | null): string {
  if (!error) return "Unknown database error";
  const parts = [error.message, error.code, error.details, error.hint].filter(Boolean);
  return parts.join(" — ") || "Unknown database error";
}
