import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase con la service_role key. SOLO para uso en el servidor
 * (Server Actions / Route Handlers). Omite RLS — nunca exponer al cliente.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
