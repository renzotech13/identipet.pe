import { createClient } from "@/lib/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { RegistroWizard } from "@/components/registro-wizard";

export const metadata = { title: "Registrar mi mascota — IdentiPet" };

export default async function RegistroMascotaPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let userLabel = "";
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("nombre, apellido")
      .eq("id", user.id)
      .single();
    userLabel = `${profile?.nombre ?? ""} ${profile?.apellido ?? ""} (${user.email})`;
  }

  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader />
      <RegistroWizard loggedIn={!!user} userLabel={userLabel} />
    </div>
  );
}
