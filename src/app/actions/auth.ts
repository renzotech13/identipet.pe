"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

/** Cierra sesión. Se invoca por POST (form action), nunca por GET, para evitar
 *  que el prefetch de Next dispare el cierre de sesión accidentalmente. */
export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
