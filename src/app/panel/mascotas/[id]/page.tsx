import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PawPrint } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { qrDataUrl } from "@/lib/qr";
import { siteUrl } from "@/lib/config";

function edad(fecha: string | null): string {
  if (!fecha) return "";
  const d = new Date(fecha);
  const now = new Date();
  let months = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
  if (now.getDate() < d.getDate()) months--;
  if (months < 0) months = 0;
  const years = Math.floor(months / 12);
  if (years >= 1) return `${years} año${years > 1 ? "s" : ""}`;
  return `${months} mes${months === 1 ? "" : "es"}`;
}

export default async function PetProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: pet } = await supabase.from("pets").select("*").eq("id", Number(id)).single();
  if (!pet || pet.owner_id !== user.id) notFound();

  const { data: contacts } = await supabase
    .from("pet_contacts")
    .select("*")
    .eq("pet_id", pet.id)
    .order("es_principal", { ascending: false });

  const publicUrl = `${siteUrl}/mascota/${pet.slug_publico}`;
  const qr = await qrDataUrl(publicUrl);
  const waShare = `https://wa.me/?text=${encodeURIComponent(`Conoce a ${pet.nombre} en IdentiPet: ${publicUrl}`)}`;

  const sexo = { macho: "Macho", hembra: "Hembra", desconocido: "No especificado" }[pet.sexo as string] ?? "—";
  const repro = { entero: "Entero", castrado: "Castrado", esterilizado: "Esterilizado", desconocido: "No especificado" }[pet.estado_reproductivo as string] ?? "—";

  const rows: [string, string][] = [
    ["Sexo", sexo],
    ["Color", pet.color || "—"],
    ["Peso", pet.peso ? `${pet.peso} kg` : "—"],
    ["Microchip", pet.tiene_microchip ? `Sí${pet.numero_chip ? ` (${pet.numero_chip})` : ""}` : "No"],
    ["Estado reproductivo", repro],
    ["Código interno", pet.codigo_interno || "—"],
    ["Registrada el", new Date(pet.created_at).toLocaleDateString("es-PE")],
  ];

  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader />
      <section className="mx-auto max-w-4xl px-5 py-10">
        <Link href="/panel" className="text-sm text-muted">← Mis mascotas</Link>

        <div className="mt-4 grid items-start gap-6 md:grid-cols-[1.4fr_1fr]">
          {/* Datos */}
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-4">
              <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-2xl bg-primary-50 text-primary">
                {pet.foto_url ? <img src={pet.foto_url} alt={pet.nombre} className="h-full w-full object-cover" /> : <PawPrint className="h-10 w-10" />}
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-secondary">{pet.nombre}</h1>
                <div className="font-black tracking-wide text-primary-dark">{pet.identipet_code}</div>
                <p className="text-sm text-muted">{pet.especie}{pet.raza ? ` · ${pet.raza}` : ""}{pet.fecha_nacimiento ? ` · ${edad(pet.fecha_nacimiento)}` : ""}</p>
              </div>
            </div>
            <table className="w-full text-sm">
              <tbody>
                {rows.map(([k, v]) => (
                  <tr key={k} className="border-b border-border">
                    <td className="py-2.5 text-muted">{k}</td>
                    <td className="py-2.5 text-right font-semibold text-secondary">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pet.caracteristicas && (
              <div className="mt-4">
                <div className="text-xs uppercase tracking-wide text-muted">Características</div>
                <p className="mt-1 whitespace-pre-line text-secondary">{pet.caracteristicas}</p>
              </div>
            )}
            {contacts && contacts.length > 0 && (
              <div className="mt-5">
                <div className="mb-2 text-xs uppercase tracking-wide text-muted">Contactos de emergencia</div>
                {contacts.map((c) => (
                  <div key={c.id} className="flex justify-between border-b border-border py-2">
                    <span><strong>{c.nombre}</strong>{c.relacion ? ` · ${c.relacion}` : ""}</span>
                    <span className="text-primary-dark">{c.telefono}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Carnet / QR */}
          <div className="rounded-2xl border border-border bg-white p-6 text-center shadow-sm">
            <h3 className="font-bold text-secondary">Carnet digital</h3>
            <p className="mb-3 text-xs text-muted">Escanea o comparte el QR</p>
            <img src={qr} alt={`QR de ${pet.nombre}`} width={200} height={200} className="mx-auto rounded-xl border border-border" />
            <div className="mt-3 font-black tracking-wide text-primary-dark">{pet.identipet_code}</div>
            <a href={publicUrl} target="_blank" className="mt-1 block break-all text-xs text-muted">{publicUrl}</a>
            <div className="mt-4 space-y-2">
              <a href={publicUrl} target="_blank" className="block rounded-lg border border-border px-4 py-2.5 font-semibold text-secondary hover:border-primary">Ver página pública</a>
              <a href={waShare} target="_blank" className="block rounded-lg border border-border px-4 py-2.5 font-semibold text-secondary hover:border-primary">Compartir por WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
