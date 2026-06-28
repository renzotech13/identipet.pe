import Link from "next/link";
import { notFound } from "next/navigation";
import { PawPrint } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function PublicPetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: pet } = await supabase.from("pets").select("*").eq("slug_publico", slug).single();
  if (!pet) notFound();

  const { data: contacts } = await supabase
    .from("pet_contacts")
    .select("*")
    .eq("pet_id", pet.id)
    .order("es_principal", { ascending: false });

  const perdido = pet.perdido;

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-secondary">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
              <PawPrint className="h-5 w-5" />
            </span>
            Identi<span className="text-primary">Pet</span>
          </Link>
          <Link href="/" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-secondary">Conoce IdentiPet</Link>
        </div>
      </header>

      <section className="mx-auto max-w-lg px-5 py-9">
        {perdido && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-red-700">
            <strong>⚠ MASCOTA PERDIDA</strong>
            <br />Si encontraste a {pet.nombre}, por favor contacta a su familia.
          </div>
        )}

        <div className="rounded-2xl border border-border bg-white p-7 text-center shadow-sm">
          <div className="mx-auto grid h-36 w-36 place-items-center overflow-hidden rounded-full bg-primary-50 text-primary">
            {pet.foto_url ? <img src={pet.foto_url} alt={pet.nombre} className="h-full w-full object-cover" /> : <PawPrint className="h-14 w-14" />}
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-secondary">{pet.nombre}</h1>
          <div className="mt-1 font-black tracking-widest text-primary-dark">{pet.identipet_code}</div>
          <p className="mt-2 text-muted">{pet.especie}{pet.raza ? ` · ${pet.raza}` : ""}</p>

          <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
            {pet.color && <span className="rounded-full bg-surface px-3 py-1 font-semibold text-secondary">{pet.color}</span>}
            {pet.sexo !== "desconocido" && <span className="rounded-full bg-surface px-3 py-1 font-semibold text-secondary">{pet.sexo === "macho" ? "Macho" : "Hembra"}</span>}
            {pet.tiene_microchip && <span className="rounded-full bg-surface px-3 py-1 font-semibold text-secondary">Con microchip</span>}
          </div>

          {pet.caracteristicas && <p className="mt-4 whitespace-pre-line text-secondary">{pet.caracteristicas}</p>}
        </div>

        {contacts && contacts.length > 0 && (
          <div className="mt-5 rounded-2xl border border-border bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-center font-bold text-secondary">Contacto de la familia</h3>
            {contacts.map((c) => (
              <div key={c.id} className="flex items-center justify-between border-b border-border py-2.5 last:border-0">
                <span><strong>{c.nombre}</strong>{c.relacion ? ` · ${c.relacion}` : ""}</span>
                <a href={`https://wa.me/${String(c.telefono).replace(/\D/g, "")}`} target="_blank" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">
                  WhatsApp
                </a>
              </div>
            ))}
          </div>
        )}

        <p className="mt-5 text-center text-xs text-muted">Perfil verificado por <Link href="/" className="text-primary-dark">IdentiPet</Link></p>
      </section>
    </div>
  );
}
