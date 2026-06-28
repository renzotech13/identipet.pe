import Link from "next/link";
import { Play, User } from "lucide-react";

export const metadata = {
  title: "IdentiPet — Identidad para toda la vida",
};

/* Placeholder de imagen para reemplazar luego */
function Ph({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-slate-200/70 text-center text-[11px] font-medium text-slate-400 ${className}`}
    >
      {label}
    </div>
  );
}

const navItems = ["Inicio", "Beneficios", "Servicios", "Marketplace", "Veterinarias", "Blog", "Contacto"];

const problemas = [
  ["Se puede perder", "Si se pierde, es difícil que regrese a casa."],
  ["Historial en papel", "Perder o tener desordenada la información médica."],
  ["Falta de protección", "No tener identificación dificulta su recuperación."],
  ["Gastos inesperados", "Emergencias sin historial pueden costar más."],
  ["Pocos beneficios", "No acceder a descuentos ni promociones."],
];

const soluciones = [
  ["Microchip", "Identificación única y permanente."],
  ["Identidad Digital", "Carnet digital con código QR único."],
  ["Historial Médico", "Toda su información médica organizada."],
  ["Alerta de Pérdida", "Comparte su perfil y encuéntralo más rápido."],
  ["Beneficios Exclusivos", "Descuentos en marcas y servicios aliados."],
  ["Servicios para ti", "Veterinarias, emergencias, paseadores y más."],
];

const stats = [
  ["+25K", "Mascotas registradas"],
  ["+8K", "Familias felices"],
  ["+300", "Veterinarias aliadas"],
  ["+120", "Ciudades en Perú"],
  ["4.9/5", "Valoración de usuarios"],
];

const marcas = ["Royal Canin", "Purina", "PetShop", "Zoetis", "Brit", "+ muchas más"];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-50 border-b border-border bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Ph label="logo" className="h-11 w-11 shrink-0 rounded-xl !bg-primary/15 !text-primary-dark" />
            <span className="leading-none">
              <span className="block text-2xl font-extrabold text-secondary">
                Identi<span className="text-primary">Pet</span>
              </span>
              <span className="mt-0.5 block text-[10px] font-bold tracking-[0.15em] text-muted">
                IDENTIDAD PARA TODA LA VIDA
              </span>
            </span>
          </Link>

          {/* Nav centrado */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-secondary hover:text-primary-dark">
                {item}
              </a>
            ))}
          </nav>

          {/* Botones */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-secondary hover:border-primary"
            >
              <User className="h-4 w-4" /> Iniciar sesión
            </Link>
            <Link
              href="/registro-mascota"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              <Ph label="" className="h-4 w-4 rounded !bg-white/30" /> Registrar mi mascota
            </Link>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 lg:grid-cols-2 lg:py-16">
          {/* Izquierda */}
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-secondary sm:text-5xl">
              Tu mascota merece una identidad para <span className="text-primary">toda la vida</span> ♡
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              La plataforma completa que protege su identidad con microchip, guarda su historial médico y te conecta con todo lo que necesitas para su bienestar.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link
                href="/registro-mascota"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white hover:bg-primary-dark"
              >
                <Ph label="" className="h-4 w-4 rounded-full !bg-white/30" /> Registrar mi mascota ahora
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 font-semibold text-secondary hover:border-primary"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-50 text-primary-dark">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </span>
                Ver cómo funciona
              </a>
            </div>
          </div>

          {/* Derecha: composición de imágenes (placeholders) */}
          <div className="relative min-h-[420px]">
            <Ph label="imagen: perro (hero)" className="absolute inset-0 rounded-3xl" />
            <Ph label="microchip" className="absolute -top-2 right-6 h-12 w-40 rounded-full !bg-white shadow-md" />
            <Ph label="tarjeta: carnet digital" className="absolute bottom-6 left-0 h-40 w-64 rounded-2xl !bg-white shadow-xl" />
            <Ph label="mockup: celular" className="absolute -right-2 bottom-2 h-72 w-40 rounded-[2rem] !bg-white shadow-xl" />
          </div>
        </div>
      </section>

      {/* ============ PROBLEMAS (navy) ============ */}
      <section className="bg-secondary py-12 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1fr_3fr] lg:items-center">
          <div>
            <h2 className="text-2xl font-extrabold">
              Sabemos lo que <span className="text-primary">te preocupa</span>
            </h2>
            <p className="mt-2 text-sm text-white/70">Estos son los problemas más comunes de los Pet Parents</p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {problemas.map(([titulo, texto]) => (
              <div key={titulo}>
                <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-accent">
                  <Ph label="" className="h-5 w-5 rounded !bg-white/40" />
                </div>
                <h3 className="text-sm font-bold">{titulo}</h3>
                <p className="mt-1 text-xs text-white/60">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SOLUCIONES (blanco) ============ */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <h2 className="text-3xl font-extrabold text-secondary">
              IdentiPet es la <span className="text-primary">solución completa</span>
            </h2>
            <p className="mt-2 text-muted">Todo lo que tu mascota necesita en un solo lugar</p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-6">
            {soluciones.map(([titulo, texto]) => (
              <div key={titulo}>
                <div className="mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary-50">
                  <Ph label="" className="h-5 w-5 rounded !bg-primary/30" />
                </div>
                <h3 className="text-sm font-bold text-secondary">{titulo}</h3>
                <p className="mt-1 text-xs text-muted">{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TARJETAS DESTACADAS ============ */}
      <section className="pb-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-3">
          {/* Card 1 - verde claro */}
          <div className="flex flex-col rounded-3xl bg-[#e9f7ec] p-7">
            <h3 className="text-xl font-extrabold text-secondary">
              <span className="text-primary-dark">♥</span> Protege su vida
            </h3>
            <p className="mt-2 text-sm text-muted">
              Con microchip y perfil digital aumentas <strong>10 veces</strong> las posibilidades de recuperarlo si se pierde.
            </p>
            <Link href="/registro-mascota" className="mt-4 inline-flex w-fit rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
              Conoce más
            </Link>
            <Ph label="imagen: perro + microchip" className="mt-5 h-40 rounded-2xl" />
          </div>

          {/* Card 2 - celeste claro */}
          <div className="flex flex-col rounded-3xl bg-[#e7f1fb] p-7">
            <h3 className="text-xl font-extrabold text-secondary">Salud siempre al día</h3>
            <p className="mt-2 text-sm text-muted">
              Ten a la mano su historial médico, vacunas, desparasitaciones, alergias y más.
            </p>
            <Link href="/login" className="mt-4 inline-flex w-fit rounded-lg border border-[#bcd8f2] bg-white px-5 py-2.5 text-sm font-semibold text-secondary hover:border-primary">
              Ver historial
            </Link>
            <Ph label="mockup: historial médico" className="mt-5 h-40 rounded-2xl" />
          </div>

          {/* Card 3 - beige claro */}
          <div className="flex flex-col rounded-3xl bg-[#f7f1e3] p-7">
            <h3 className="text-xl font-extrabold text-secondary">Ahorra más</h3>
            <p className="mt-2 text-sm text-muted">
              Accede a descuentos exclusivos en alimentos, veterinarias, medicinas y mucho más.
            </p>
            <Link href="#" className="mt-4 inline-flex w-fit rounded-lg border border-[#e3d6b8] bg-white px-5 py-2.5 text-sm font-semibold text-secondary hover:border-primary">
              Ver beneficios
            </Link>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {marcas.map((m) => (
                <Ph key={m} label={m} className="h-14 rounded-xl !bg-white !text-slate-500 shadow-sm" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ CINTA DE ESTADÍSTICAS (verde oscuro) ============ */}
      <section className="bg-[#14431f] py-10 text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map(([cifra, label]) => (
            <div key={label} className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/10">
                <Ph label="" className="h-5 w-5 rounded !bg-white/30" />
              </div>
              <div>
                <div className="text-2xl font-extrabold leading-none">{cifra}</div>
                <div className="mt-1 text-xs text-white/70">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="mt-auto bg-secondary py-10 text-center text-sm text-slate-300">
        © {new Date().getFullYear()} IdentiPet · identipet.pe · Lima, Perú
      </footer>
    </div>
  );
}
