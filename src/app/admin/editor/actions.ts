"use server";

import { createClient } from "@/lib/supabase/server";

/** Guarda (upsert) la página del builder. Solo administradores (RLS lo refuerza). */
export async function savePage(slug: string, data: unknown): Promise<{ ok?: true; error?: string }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "No autorizado" };

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "administrador") return { error: "No autorizado" };

  const { error } = await supabase
    .from("pages")
    .upsert({ slug, data, updated_at: new Date().toISOString(), updated_by: user.id }, { onConflict: "slug" });

  if (error) return { error: error.message };
  return { ok: true };
}
