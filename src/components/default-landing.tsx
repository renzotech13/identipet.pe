import Link from "next/link";
import {
  PawPrint,
  Play,
  User,
  ShieldCheck,
  HeartPulse,
  Gift,
  ShoppingBag,
  MapPin,
  Stethoscope,
  Bone,
  Heart,
  Siren,
  Footprints,
  MoreHorizontal,
  Star,
  Building2,
  ClipboardList,
  BadgePercent,
  ArrowRight,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";

function Ph({
  label,
  src,
  alt,
  className = "",
  fit = "cover",
}: {
  label: string;
  src?: string;
  alt?: string;
  className?: string;
  fit?: "cover" | "contain";
}) {
  if (src) {
    const fitClass = fit === "contain" ? "object-contain" : "object-cover";
    return <img src={src} alt={alt ?? label} className={`${fitClass} ${className}`} />;
  }
  return (
    <div className={`flex items-center justify-center bg-slate-200/70 text-center text-[11px] font-medium text-slate-400 ${className}`}>
      {label}
    </div>
  );
}

const navItems = ["Beneficios", "Servicios", "Marketplace", "Veterinarias", "Blog", "Contacto"];

const featureBar: [LucideIcon, string][] = [
  [ShieldCheck, "Identidad Digital"],
  [HeartPulse, "Historial Médico"],
  [Gift, "Beneficios Exclusivos"],
  [ShoppingBag, "Marketplace de Productos"],
  [MapPin, "Encuentra Servicios"],
];

const miniFeatures: [LucideIcon, string][] = [
  [Stethoscope, "Veterinarias"],
  [HeartPulse, "Historial Médico"],
  [Bone, "Alimentos"],
  [Gift, "Beneficios"],
  [Heart, "Adopciones"],
  [Siren, "Emergencias"],
  [Footprints, "Paseadores"],
  [MoreHorizontal, "Y mucho más"],
];

const beneficios: [LucideIcon, string, string][] = [
  [ShieldCheck, "Tu mascota siempre identificada", "Comparte su información en segundos si se pierde."],
  [ClipboardList, "Historial médico siempre disponible", "Toda su información organizada y segura."],
  [BadgePercent, "Descuentos exclusivos", "Ahorra en cientos de establecimientos y marcas aliadas."],
];

const stats: [LucideIcon, string, string][] = [
  [PawPrint, "+25K", "Mascotas registradas"],
  [Heart, "+8K", "Familias felices"],
  [Building2, "+500", "Veterinarias aliadas"],
  [MapPin, "+120", "Ciudades"],
];

const productos = [
  ["Alimento Premium", "S/ 89.90"],
  ["Collar GPS", "S/ 129.90"],
  ["Snacks Naturales", "S/ 25.90"],
  ["Cama Antiestrés", "S/ 119.90"],
];

const servicios = ["Veterinarias", "Hoteles", "Peluquerías", "Entrenadores"];
const marcasBeneficios = ["Purina", "Royal Canin", "Brit", "PetShop", "SuperPet", "Zoetis"];
const marcasStrip = ["Purina", "Royal Canin", "Brit", "PetShop", "Zoetis", "Petlove", "Mimaskot", "Dog Chow", "Virbac"];
const testimonios = [
  ["María y Loki", "IdentiPet me da tranquilidad sabiendo que Loki está siempre protegido."],
  ["Carlos y Nala", "El historial médico de Nala siempre a la mano. Es súper completo y fácil de usar."],
  ["Ana y Max", "Los beneficios y descuentos son increíbles, ya hemos ahorrado mucho."],
];

export function DefaultLanding() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-[#f9fbfb]">
      {/* ============ HEADER ============ */}
      <header className="sticky top-0 z-50 border-b border-border bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-white">
              <PawPrint className="h-6 w-6" />
            </span>
            <span className="leading-none">
              <span className="block text-2xl font-extrabold text-secondary">
                Identi<span className="text-primary">Pet</span>
              </span>
              <span className="mt-0.5 block text-[10px] font-bold tracking-[0.15em] text-muted">IDENTIDAD PARA TODA LA VIDA</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a key={item} href="#" className="text-sm font-medium text-secondary hover:text-primary-dark">{item}</a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-secondary hover:border-primary">
              <User className="h-4 w-4" /> Iniciar sesión
            </Link>
            <Link href="/registro-mascota" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
              <PawPrint className="h-4 w-4" /> Registrar mi mascota
            </Link>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-12 pb-0 lg:grid-cols-2">
          <div>
            <h1 className="text-5xl font-extrabold leading-[1.05] tracking-tight text-secondary">
              Tu mascota merece una identidad para <span className="text-primary">toda la vida</span>{" "}
              <Heart className="inline h-10 w-10 fill-primary text-primary" />
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              La plataforma que protege su identidad, organiza su historial médico, te conecta con servicios y te da beneficios exclusivos.
            </p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/registro-mascota" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white hover:bg-primary-dark">
                <PawPrint className="h-5 w-5" /> Crear la identidad de mi mascota
              </Link>
              <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 font-semibold text-secondary hover:border-primary">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-white"><Play className="h-3.5 w-3.5 fill-current" /></span>
                Ver cómo funciona
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <div className="flex items-center gap-2">
                <Ph label="avatars" className="h-9 w-20 rounded-full" />
                <div className="text-xs"><div className="font-bold text-secondary">+25K mascotas</div><div className="text-muted">ya registradas</div></div>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-7 w-7 text-primary" />
                <div className="text-xs"><div className="font-bold text-secondary">100% Seguro</div><div className="text-muted">y confiable</div></div>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
                <div className="text-xs"><div className="font-bold text-secondary">4.9/5</div><div className="text-muted">Valoración de usuarios</div></div>
              </div>
            </div>
          </div>

          <div className="relative min-h-[440px]">
            <Ph src="/img-bg-of.jpg" alt="Familia con su mascota" label="imagen: persona + perro (hero)" className="h-full min-h-[440px] w-full rounded-3xl" />
            <Ph src="/img-mockup.png" alt="App IdentiPet" label="mockup: celular" fit="contain" className="ip-float absolute -right-2 bottom-[-48px] z-30 h-[470px] w-auto drop-shadow-2xl sm:-right-6" />
          </div>
        </div>
      </section>

      {/* ============ BARRA DE FEATURES (verde) ============ */}
      <section className="relative z-10 mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-2 gap-y-6 rounded-3xl bg-primary px-6 py-7 text-white sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/20">
          {featureBar.map(([Icon, label]) => (
            <div key={label} className="flex items-center gap-3 px-4">
              <Icon className="h-7 w-7 shrink-0" />
              <span className="text-sm font-semibold leading-tight">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ============ TODO LO QUE NECESITA ============ */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-3">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-secondary">
              Todo lo que tu mascota necesita <span className="text-primary">en un solo lugar</span>
            </h2>
            <div className="mt-7 grid grid-cols-4 gap-x-4 gap-y-6">
              {miniFeatures.map(([Icon, label]) => (
                <div key={label} className="text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-border bg-white text-primary-dark shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="mt-2 text-[11px] font-semibold text-secondary">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-center gap-2">
            <Ph label="mockup: Historial Médico" className="h-80 w-44 rounded-[1.75rem] !bg-white shadow-xl" />
            <Ph label="mockup: Beneficios (Hasta 30%)" className="h-72 w-44 rounded-[1.75rem] !bg-white shadow-xl" />
          </div>

          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-secondary">
              Protección, salud y beneficios para <span className="text-primary">una vida increíble</span>
            </h2>
            <div className="mt-6 space-y-5">
              {beneficios.map(([Icon, titulo, texto]) => (
                <div key={titulo} className="flex gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-dark">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-secondary">{titulo}</h3>
                    <p className="text-sm text-muted">{texto}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="mt-6 inline-flex items-center gap-1 font-semibold text-primary-dark hover:underline">
              Conoce todos los beneficios <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ============ CINTA DE ESTADÍSTICAS ============ */}
      <section className="mx-auto max-w-7xl px-5">
        <div className="relative overflow-hidden rounded-3xl bg-[#14431f] px-8 py-9 text-white">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:pr-40">
            {stats.map(([Icon, cifra, label]) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="h-9 w-9 shrink-0 text-primary" />
                <div>
                  <div className="text-3xl font-black leading-none">{cifra}</div>
                  <div className="mt-1 text-xs text-white/70">{label}</div>
                </div>
              </div>
            ))}
          </div>
          <Ph label="imagen: perro" className="absolute bottom-0 right-4 hidden h-40 w-40 rounded-2xl !bg-white/10 !text-white/50 lg:flex" />
        </div>
      </section>

      {/* ============ 3 TARJETAS ============ */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
            <CardHead title="Marketplace para tu mascota" />
            <div className="mt-5 grid grid-cols-2 gap-4">
              {productos.map(([nombre, precio]) => (
                <div key={nombre}>
                  <Ph label="producto" className="h-24 w-full rounded-xl" />
                  <div className="mt-2 text-xs font-semibold text-secondary">{nombre}</div>
                  <div className="text-xs font-bold text-primary-dark">{precio}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
            <CardHead title="Encuentra servicios cerca de ti" />
            <div className="mt-5 grid grid-cols-2 gap-5">
              {servicios.map((s) => (
                <div key={s} className="text-center">
                  <Ph label="foto" className="mx-auto h-20 w-20 rounded-full" />
                  <div className="mt-2 text-xs font-semibold text-secondary">{s}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
            <CardHead title="Beneficios exclusivos" />
            <div className="mt-5 grid grid-cols-3 gap-3">
              {marcasBeneficios.map((m) => (
                <Ph key={m} label={m} className="h-16 rounded-xl !bg-slate-50 !text-slate-500 shadow-sm" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ STRIP DE MARCAS ============ */}
      <section className="border-y border-border bg-surface py-10">
        <div className="mx-auto max-w-7xl px-5">
          <p className="mb-6 text-center text-sm font-semibold text-muted">Empresas y marcas que confían en nosotros</p>
          <div className="flex items-center gap-5">
            <div className="grid flex-1 grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
              {marcasStrip.map((m) => (
                <Ph key={m} label={m} className="h-12 rounded-lg !bg-white !text-slate-500 shadow-sm" />
              ))}
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted"><ChevronRight className="h-5 w-5" /></span>
          </div>
        </div>
      </section>

      {/* ============ TESTIMONIOS ============ */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-secondary">Lo que dicen nuestros Pet Parents</h2>
            <a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-dark">Ver más <ArrowRight className="h-4 w-4" /></a>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonios.map(([nombre, quote]) => (
              <div key={nombre} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <Ph label="foto" className="h-12 w-12 rounded-full" />
                  <div>
                    <div className="font-bold text-secondary">{nombre}</div>
                    <div className="flex text-amber-400">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted">&ldquo;{quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA DESCARGA APP ============ */}
      <section className="bg-primary">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 lg:grid-cols-[1fr_2fr_1fr]">
          <Ph label="imagen: perro" className="hidden h-40 rounded-2xl !bg-white/15 !text-white/60 lg:flex" />
          <div className="text-center text-white">
            <h2 className="text-3xl font-extrabold">
              Descarga la app de <span className="block text-4xl">IdentiPet</span>
            </h2>
            <p className="mt-2 text-white/85">Muy pronto podrás llevar todo IdentiPet en tu bolsillo.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Ph label="Google Play" className="h-12 w-40 rounded-xl !bg-secondary !text-white/80" />
              <Ph label="App Store" className="h-12 w-40 rounded-xl !bg-secondary !text-white/80" />
            </div>
          </div>
          <Ph label="mockup: celular" className="mx-auto hidden h-56 w-32 rounded-[1.75rem] !bg-white/15 !text-white/60 lg:flex" />
        </div>
      </section>

      <footer className="bg-secondary py-10 text-center text-sm text-slate-300">
        © {new Date().getFullYear()} IdentiPet · identipet.pe · Lima, Perú
      </footer>
    </div>
  );
}

function CardHead({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="font-extrabold text-secondary">{title}</h3>
      <a href="#" className="inline-flex items-center gap-1 text-xs font-semibold text-primary-dark">Ver más <ArrowRight className="h-3.5 w-3.5" /></a>
    </div>
  );
}
