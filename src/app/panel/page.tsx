import Link from "next/link";
import { redirect } from "next/navigation";
import { PawPrint } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader } from "@/components/site-header";

export const metadata = { title: "Mi panel — IdentiPet" };

type Pet = {
  id: number;
  nombre: string;
  identipet_code: string;
  especie: string;
  raza: string | null;
  foto_url: string | null;
  pago_estado: string;
};

export default async function PanelPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("nombre, role").eq("id", user.id).single();
  const { data: pets } = await supabase
    .from("pets")
    .select("id, nombre, identipet_code, especie, raza, foto_url, pago_estado")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  const list = (pets ?? []) as Pet[];

  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-primary-dark">Mi panel</span>
            <h1 className="mt-1 text-3xl font-extrabold text-secondary">Hola, {profile?.nombre ?? ""}</h1>
            <p className="text-muted">Rol: {profile?.role ?? "propietario"}</p>
          </div>
          <Link href="/registro-mascota" className="rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-dark">
            Registrar mascota
          </Link>
        </div>

        {list.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white p-12 text-center shadow-sm">
            <PawPrint className="mx-auto h-16 w-16 text-primary" />
            <h2 className="mt-3 text-xl font-bold text-secondary">Aún no tienes mascotas registradas</h2>
            <p className="mt-1 text-muted">Registra a tu primera mascota para generar su carnet digital.</p>
            <Link href="/registro-mascota" className="mt-5 inline-block rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark">
              Registrar mi primera mascota
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((pet) => (
              <Link key={pet.id} href={`/panel/mascotas/${pet.id}`} className="rounded-2xl border border-border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl bg-primary-50 text-primary">
                    {pet.foto_url ? <img src={pet.foto_url} alt="" className="h-full w-full object-cover" /> : <PawPrint className="h-7 w-7" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary">{pet.nombre}</h3>
                    <div className="text-sm font-bold tracking-wide text-primary-dark">{pet.identipet_code}</div>
                    <p className="text-sm text-muted">{pet.especie}{pet.raza ? ` · ${pet.raza}` : ""}</p>
                  </div>
                </div>
                {pet.pago_estado === "pendiente" && (
                  <div className="mt-3 rounded-md bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">Pago pendiente</div>
                )}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
