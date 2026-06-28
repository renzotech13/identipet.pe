import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { registroConfig, money } from "@/lib/config";

export default async function GraciasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: pet } = await supabase
    .from("pets")
    .select("id, nombre, identipet_code, owner_id")
    .eq("id", Number(id))
    .single();

  if (!pet || pet.owner_id !== user.id) notFound();

  const precio = money(registroConfig.precio);
  const wa = registroConfig.whatsapp.replace(/\D/g, "");
  const msg = `Hola IdentiPet, registré a ${pet.nombre} (código ${pet.identipet_code}). Adjunto mi comprobante de pago de ${precio}.`;
  const waLink = `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`;
  const pago = registroConfig.pago;

  return (
    <div className="min-h-screen bg-surface">
      <SiteHeader />
      <section className="mx-auto max-w-xl px-5 py-10">
        <div className="rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
          <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />
          <h1 className="mt-3 text-2xl font-extrabold text-secondary">¡{pet.nombre} fue registrada!</h1>
          <p className="mt-1 text-muted">Tu número de identidad IdentiPet es:</p>
          <div className="mt-2 text-2xl font-black tracking-widest text-primary-dark">{pet.identipet_code}</div>
          <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-left text-amber-800">
            <strong>Pago pendiente.</strong> Tu registro quedará <strong>activo</strong> cuando confirmemos tu pago de <strong>{precio}</strong>.
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h3 className="mb-3 font-bold text-secondary">1. Realiza el pago</h3>
          <div className="rounded-lg border border-dashed border-primary bg-surface p-4 text-sm">
            {pago.banco && <Row k="Banco" v={pago.banco} />}
            {pago.titular && <Row k="Titular" v={pago.titular} />}
            {pago.cuenta && <Row k="Cuenta" v={pago.cuenta} />}
            {pago.cci && <Row k="CCI" v={pago.cci} />}
            {pago.yape && <Row k="Yape" v={pago.yape} />}
            <div className="flex items-center justify-between gap-4 py-1.5 font-black text-primary-dark">
              <span>Total</span><span>{precio}</span>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-border bg-white p-6 shadow-sm">
          <h3 className="mb-2 font-bold text-secondary">2. Envía tu comprobante</h3>
          <p className="mb-4 text-sm text-muted">Mándanos tu comprobante por WhatsApp y activamos tu carnet.</p>
          <a href={waLink} target="_blank" className="block w-full rounded-lg bg-primary px-5 py-3 text-center font-semibold text-white hover:bg-primary-dark">
            Enviar comprobante por WhatsApp
          </a>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href={`/panel/mascotas/${pet.id}`} className="rounded-lg border border-border px-5 py-2.5 font-semibold text-secondary hover:border-primary">Ver el carnet</Link>
          <Link href="/panel" className="rounded-lg border border-border px-5 py-2.5 font-semibold text-secondary hover:border-primary">Ir a mi panel</Link>
        </div>
      </section>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-1.5">
      <span className="text-muted">{k}</span>
      <span className="font-semibold text-secondary">{v}</span>
    </div>
  );
}
