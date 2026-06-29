import type { Data } from "@measured/puck";
import { createClient } from "@/lib/supabase/server";
import { DefaultLanding } from "@/components/default-landing";
import { LandingRenderer } from "@/components/landing-renderer";

export const metadata = { title: "IdentiPet — Identidad para toda la vida" };

export default async function Home() {
  const supabase = await createClient();
  const { data: page } = await supabase.from("pages").select("data").eq("slug", "home").maybeSingle();

  const data = page?.data as Data | undefined;
  // Si el builder tiene contenido publicado, se renderiza desde ahí; si no, la landing por defecto.
  if (data && Array.isArray(data.content) && data.content.length > 0) {
    return <LandingRenderer data={data} />;
  }
  return <DefaultLanding />;
}
