import type { Data } from "@measured/puck";
import { createClient } from "@/lib/supabase/server";
import { LandingRenderer } from "@/components/landing-renderer";
import { defaultHomeData } from "@/puck/seed";

export const metadata = { title: "IdentiPet — Identidad para toda la vida" };

export default async function Home() {
  const supabase = await createClient();
  const { data: page } = await supabase.from("pages").select("data").eq("slug", "home").maybeSingle();

  const saved = page?.data as Data | undefined;
  // Si hay diseño guardado en el builder, se usa; si no, el diseño por defecto.
  const data = saved && Array.isArray(saved.content) && saved.content.length > 0 ? saved : defaultHomeData;

  return <LandingRenderer data={data} />;
}
