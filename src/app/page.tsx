import Link from "next/link";
import {
  PawPrint,
  ShieldCheck,
  Bell,
  IdCard,
  MapPin,
  Gift,
  QrCode,
} from "lucide-react";
import { AwardBadge } from "@/components/ui/award-badge";

const features = [
  { icon: IdCard, title: "Identidad digital", desc: "Número único IdentiPet y página pública para cada mascota." },
  { icon: QrCode, title: "Carnet con QR", desc: "Llévalo en tu celular y compártelo con un código QR." },
  { icon: Bell, title: "Recordatorios", desc: "Vacunas, desparasitaciones y controles por correo y WhatsApp." },
  { icon: MapPin, title: "Modo perdida", desc: "Página de búsqueda con contacto y recompensa." },
  { icon: ShieldCheck, title: "Historial médico", desc: "Vacunas, cirugías y exámenes siempre organizados." },
  { icon: Gift, title: "Club de beneficios", desc: "Descuentos, cupones y cashback en comercios afiliados." },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-secondary">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
              <PawPrint className="h-5 w-5" />
            </span>
            Identi<span className="text-primary">Pet</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/login" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-secondary hover:border-primary">
              Ingresar
            </Link>
            <Link href="/registro-mascota" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">
              Registrar mascota
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 via-surface to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-secondary md:text-5xl">
              La identidad digital de <span className="text-primary">tu mascota</span>
            </h1>
            <p className="mt-5 text-lg text-muted">
              Registra a tu mascota y accede a su historial médico, carnet digital, código QR y beneficios exclusivos. Todo en una sola plataforma.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/registro-mascota" className="rounded-lg bg-primary px-7 py-3 font-semibold text-white hover:bg-primary-dark">
                Registrar mi mascota
              </Link>
              <Link href="#beneficios" className="rounded-lg border border-border px-7 py-3 font-semibold text-secondary hover:border-primary">
                Ver beneficios
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-7 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white">
                <PawPrint className="h-9 w-9" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-secondary">Max</h3>
                <div className="font-extrabold tracking-wide text-primary-dark">IP-000123</div>
                <div className="text-sm text-muted">Labrador · 3 años</div>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <AwardBadge type="verified" code="" />
            </div>
            <p className="mt-3 text-center text-xs text-muted">Insignia de mascota verificada</p>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section id="beneficios" className="bg-surface py-20">
        <div className="mx-auto max-w-6xl px-5">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-primary-dark">Beneficios</span>
            <h2 className="mt-2 text-3xl font-extrabold text-secondary">Todo lo que tu mascota necesita</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 grid h-14 w-14 place-items-center rounded-xl bg-primary-50 text-primary-dark">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-1 text-lg font-bold text-secondary">{f.title}</h3>
                <p className="text-sm text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="rounded-3xl bg-gradient-to-br from-secondary to-primary-dark p-12 text-center text-white">
            <h2 className="text-3xl font-extrabold">Dale a tu mascota su identidad digital hoy</h2>
            <p className="mt-2 text-lg opacity-90">Únete a IdentiPet y mantén toda su información segura y a la mano.</p>
            <Link href="/registro-mascota" className="mt-6 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-secondary hover:bg-primary-50">
              Registrar mi mascota
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-secondary py-10 text-center text-sm text-slate-300">
        © {new Date().getFullYear()} IdentiPet · identipet.pe · Lima, Perú
      </footer>
    </div>
  );
}
