"use client";

import Link from "next/link";
import type { Config } from "@measured/puck";
import {
  PawPrint, Play, User, ShieldCheck, HeartPulse, Gift, ShoppingBag, MapPin,
  Stethoscope, Bone, Heart, Siren, Footprints, MoreHorizontal, Star,
  Building2, ClipboardList, BadgePercent, ArrowRight, ChevronRight, type LucideIcon,
} from "lucide-react";
import { ImageField } from "./ImageField";
import { ml } from "./text";

/* Campo de imagen reutilizable para usar dentro de arrays/objetos */
const imageField = {
  type: "custom" as const,
  render: ({ onChange, value }: { onChange: (v: string) => void; value?: string }) => (
    <ImageField value={value} onChange={onChange} />
  ),
};

function Img({ src, alt = "", className = "", fit = "cover" }: { src?: string; alt?: string; className?: string; fit?: "cover" | "contain" }) {
  if (src) return <img src={src} alt={alt} className={`${fit === "contain" ? "object-contain" : "object-cover"} ${className}`} />;
  return <div className={`flex items-center justify-center bg-slate-200/70 text-[11px] text-slate-400 ${className}`}>imagen</div>;
}

const featureIcons: LucideIcon[] = [ShieldCheck, HeartPulse, Gift, ShoppingBag, MapPin];
const miniIcons: LucideIcon[] = [Stethoscope, HeartPulse, Bone, Gift, Heart, Siren, Footprints, MoreHorizontal];
const benefitIcons: LucideIcon[] = [ShieldCheck, ClipboardList, BadgePercent];
const statIcons: LucideIcon[] = [PawPrint, Heart, Building2, MapPin];

export const sectionComponents: Config["components"] = {
  /* ====== HEADER ====== */
  SiteHeaderBlock: {
    label: "Encabezado (Header)",
    fields: {
      tagline: { type: "text", label: "Tagline" },
      nav: { type: "array", label: "Menú", arrayFields: { label: { type: "text" } } },
      loginLabel: { type: "text", label: "Botón ingresar" },
      registerLabel: { type: "text", label: "Botón registrar" },
    },
    defaultProps: {
      tagline: "IDENTIDAD PARA TODA LA VIDA",
      nav: [{ label: "Beneficios" }, { label: "Servicios" }, { label: "Marketplace" }, { label: "Veterinarias" }, { label: "Blog" }, { label: "Contacto" }],
      loginLabel: "Iniciar sesión",
      registerLabel: "Registrar mi mascota",
    },
    render: ({ tagline, nav, loginLabel, registerLabel }) => (
      <header className="sticky top-0 z-50 border-b border-border bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-5">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary text-white"><PawPrint className="h-6 w-6" /></span>
            <span className="leading-none">
              <span className="block text-2xl font-extrabold text-secondary">Identi<span className="text-primary">Pet</span></span>
              <span className="mt-0.5 block text-[10px] font-bold tracking-[0.15em] text-muted">{ml(tagline)}</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {(nav ?? []).map((n: { label: string }, i: number) => <a key={i} href="#" className="text-sm font-medium text-secondary hover:text-primary-dark">{ml(n.label)}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-secondary hover:border-primary"><User className="h-4 w-4" /> {ml(loginLabel)}</Link>
            <Link href="/registro-mascota" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"><PawPrint className="h-4 w-4" /> {ml(registerLabel)}</Link>
          </div>
        </div>
      </header>
    ),
  },

  /* ====== HERO ====== */
  HeroBlock: {
    label: "Hero",
    fields: {
      titleStart: { type: "textarea", label: "Título (inicio)" },
      titleHighlight: { type: "text", label: "Título (resaltado verde)" },
      subtitle: { type: "textarea", label: "Subtítulo" },
      btnPrimary: { type: "text", label: "Botón principal" },
      btnSecondary: { type: "text", label: "Botón secundario" },
      heroImage: { ...imageField, label: "Imagen principal" },
      phoneImage: { ...imageField, label: "Imagen celular (PNG)" },
      trust: { type: "array", label: "Indicadores de confianza", arrayFields: { top: { type: "text" }, bottom: { type: "text" } } },
    },
    defaultProps: {
      titleStart: "Tu mascota merece una identidad para",
      titleHighlight: "toda la vida",
      subtitle: "La plataforma que protege su identidad, organiza su historial médico, te conecta con servicios y te da beneficios exclusivos.",
      btnPrimary: "Crear la identidad de mi mascota",
      btnSecondary: "Ver cómo funciona",
      heroImage: "/img-bg-of.jpg",
      phoneImage: "/img-mockup.png",
      trust: [
        { top: "+25K mascotas", bottom: "ya registradas" },
        { top: "100% Seguro", bottom: "y confiable" },
        { top: "4.9/5", bottom: "Valoración de usuarios" },
      ],
    },
    render: ({ titleStart, titleHighlight, subtitle, btnPrimary, btnSecondary, heroImage, phoneImage, trust }) => (
      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-12 pb-0 lg:grid-cols-2">
          <div>
            <h1 className="whitespace-pre-line text-5xl font-extrabold leading-[1.05] tracking-tight text-secondary">
              {ml(titleStart)} <span className="text-primary">{ml(titleHighlight)}</span> <Heart className="inline h-10 w-10 fill-primary text-primary" />
            </h1>
            <p className="mt-5 max-w-md whitespace-pre-line text-lg text-muted">{ml(subtitle)}</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link href="/registro-mascota" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white hover:bg-primary-dark"><PawPrint className="h-5 w-5" /> {ml(btnPrimary)}</Link>
              <a href="#" className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 font-semibold text-secondary hover:border-primary"><span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-white"><Play className="h-3.5 w-3.5 fill-current" /></span>{ml(btnSecondary)}</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              {(trust ?? []).map((t: { top: string; bottom: string }, i: number) =>
                i === 2 ? (
                  <div key={i}>
                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">{[...Array(5)].map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
                      <span className="text-xs font-bold text-secondary">{ml(t.top)}</span>
                    </div>
                    <div className="mt-0.5 text-xs text-muted">{ml(t.bottom)}</div>
                  </div>
                ) : (
                  <div key={i} className="flex items-center gap-2">
                    {i === 0 ? <PawPrint className="h-7 w-7 text-primary" /> : <ShieldCheck className="h-7 w-7 text-primary" />}
                    <div className="text-xs"><div className="font-bold text-secondary">{ml(t.top)}</div><div className="text-muted">{ml(t.bottom)}</div></div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="relative min-h-[440px]">
            <Img src={heroImage} alt="Hero" className="h-full min-h-[440px] w-full rounded-3xl" />
            <Img src={phoneImage} alt="App" fit="contain" className="ip-float absolute -right-2 bottom-[-48px] z-30 h-[470px] w-auto drop-shadow-2xl sm:-right-6" />
          </div>
        </div>
      </section>
    ),
  },

  /* ====== BARRA VERDE ====== */
  FeatureBarBlock: {
    label: "Barra de features (verde)",
    fields: { items: { type: "array", label: "Items", arrayFields: { label: { type: "text" } } } },
    defaultProps: { items: [{ label: "Identidad Digital" }, { label: "Historial Médico" }, { label: "Beneficios Exclusivos" }, { label: "Marketplace de Productos" }, { label: "Encuentra Servicios" }] },
    render: ({ items }) => (
      <section className="relative z-10 mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-2 gap-y-6 rounded-3xl bg-primary px-6 py-7 text-white sm:grid-cols-3 lg:grid-cols-5 lg:divide-x lg:divide-white/20">
          {(items ?? []).map((it: { label: string }, i: number) => {
            const Icon = featureIcons[i % featureIcons.length];
            return <div key={i} className="flex items-center gap-3 px-4"><Icon className="h-7 w-7 shrink-0" /><span className="text-sm font-semibold leading-tight">{ml(it.label)}</span></div>;
          })}
        </div>
      </section>
    ),
  },

  /* ====== TODO LO QUE NECESITA ====== */
  NeedsBlock: {
    label: "Todo lo que necesita",
    fields: {
      leftTitle: { type: "textarea", label: "Título izquierda (Enter = salto)" },
      leftHighlight: { type: "text", label: "Resaltado izquierda" },
      miniItems: { type: "array", label: "Mini features", arrayFields: { label: { type: "text" } } },
      img1: { ...imageField, label: "Mockup 1" },
      img2: { ...imageField, label: "Mockup 2" },
      rightTitle: { type: "textarea", label: "Título derecha (Enter = salto)" },
      rightHighlight: { type: "text", label: "Resaltado derecha" },
      benefits: { type: "array", label: "Beneficios", arrayFields: { title: { type: "text" }, text: { type: "textarea" } } },
      linkLabel: { type: "text", label: "Enlace inferior" },
    },
    defaultProps: {
      leftTitle: "Todo lo que tu mascota necesita", leftHighlight: "en un solo lugar",
      miniItems: [{ label: "Veterinarias" }, { label: "Historial Médico" }, { label: "Alimentos" }, { label: "Beneficios" }, { label: "Adopciones" }, { label: "Emergencias" }, { label: "Paseadores" }, { label: "Y mucho más" }],
      rightTitle: "Protección, salud y beneficios para", rightHighlight: "una vida increíble",
      benefits: [
        { title: "Tu mascota siempre identificada", text: "Comparte su información en segundos si se pierde." },
        { title: "Historial médico siempre disponible", text: "Toda su información organizada y segura." },
        { title: "Descuentos exclusivos", text: "Ahorra en cientos de establecimientos y marcas aliadas." },
      ],
      linkLabel: "Conoce todos los beneficios",
    },
    render: ({ leftTitle, leftHighlight, miniItems, img1, img2, rightTitle, rightHighlight, benefits, linkLabel }) => (
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-3">
          <div>
            <h2 className="whitespace-pre-line text-3xl font-extrabold leading-tight text-secondary">{ml(leftTitle)} <span className="text-primary">{ml(leftHighlight)}</span></h2>
            <div className="mt-7 grid grid-cols-4 gap-x-4 gap-y-6">
              {(miniItems ?? []).map((m: { label: string }, i: number) => {
                const Icon = miniIcons[i % miniIcons.length];
                return <div key={i} className="text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-border bg-white text-primary-dark shadow-sm"><Icon className="h-6 w-6" /></div><div className="mt-2 text-[11px] font-semibold text-secondary">{ml(m.label)}</div></div>;
              })}
            </div>
          </div>
          <div className="flex items-end justify-center gap-2">
            <Img src={img1} className="h-80 w-44 rounded-[1.75rem] shadow-xl" />
            <Img src={img2} className="h-72 w-44 rounded-[1.75rem] shadow-xl" />
          </div>
          <div>
            <h2 className="whitespace-pre-line text-3xl font-extrabold leading-tight text-secondary">{ml(rightTitle)} <span className="text-primary">{ml(rightHighlight)}</span></h2>
            <div className="mt-6 space-y-5">
              {(benefits ?? []).map((b: { title: string; text: string }, i: number) => {
                const Icon = benefitIcons[i % benefitIcons.length];
                return <div key={i} className="flex gap-3"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-dark"><Icon className="h-5 w-5" /></div><div><h3 className="font-bold text-secondary">{ml(b.title)}</h3><p className="whitespace-pre-line text-sm text-muted">{ml(b.text)}</p></div></div>;
              })}
            </div>
            <a href="#" className="mt-6 inline-flex items-center gap-1 font-semibold text-primary-dark hover:underline">{ml(linkLabel)} <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>
    ),
  },

  /* ====== CINTA DE STATS ====== */
  StatsRibbonBlock: {
    label: "Cinta de estadísticas",
    fields: { items: { type: "array", label: "Items", arrayFields: { value: { type: "text" }, label: { type: "text" } } }, image: { ...imageField, label: "Imagen" } },
    defaultProps: { items: [{ value: "+25K", label: "Mascotas registradas" }, { value: "+8K", label: "Familias felices" }, { value: "+500", label: "Veterinarias aliadas" }, { value: "+120", label: "Ciudades" }] },
    render: ({ items, image }) => (
      <section className="mx-auto max-w-7xl px-5">
        <div className="relative overflow-hidden rounded-3xl bg-[#14431f] px-8 py-9 text-white">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:pr-40">
            {(items ?? []).map((s: { value: string; label: string }, i: number) => {
              const Icon = statIcons[i % statIcons.length];
              return <div key={i} className="flex items-center gap-3"><Icon className="h-9 w-9 shrink-0 text-primary" /><div><div className="text-3xl font-black leading-none">{ml(s.value)}</div><div className="mt-1 text-xs text-white/70">{ml(s.label)}</div></div></div>;
            })}
          </div>
          {image && <Img src={image} className="absolute bottom-0 right-4 hidden h-40 w-40 rounded-2xl lg:block" />}
        </div>
      </section>
    ),
  },

  /* ====== 3 TARJETAS ====== */
  CardsRowBlock: {
    label: "Fila de 3 tarjetas",
    fields: {
      mkTitle: { type: "text", label: "Título marketplace" },
      products: { type: "array", label: "Productos", arrayFields: { name: { type: "text" }, price: { type: "text" }, image: imageField } },
      svTitle: { type: "text", label: "Título servicios" },
      services: { type: "array", label: "Servicios", arrayFields: { label: { type: "text" }, image: imageField } },
      bnTitle: { type: "text", label: "Título beneficios" },
      brands: { type: "array", label: "Logos", arrayFields: { image: imageField } },
    },
    defaultProps: {
      mkTitle: "Marketplace para tu mascota",
      products: [{ name: "Alimento Premium", price: "S/ 89.90" }, { name: "Collar GPS", price: "S/ 129.90" }, { name: "Snacks Naturales", price: "S/ 25.90" }, { name: "Cama Antiestrés", price: "S/ 119.90" }],
      svTitle: "Encuentra servicios cerca de ti",
      services: [{ label: "Veterinarias" }, { label: "Hoteles" }, { label: "Peluquerías" }, { label: "Entrenadores" }],
      bnTitle: "Beneficios exclusivos",
      brands: [{}, {}, {}, {}, {}, {}],
    },
    render: ({ mkTitle, products, svTitle, services, bnTitle, brands }) => (
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 lg:grid-cols-3">
          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
            <h3 className="font-extrabold text-secondary">{ml(mkTitle)}</h3>
            <div className="mt-5 grid grid-cols-2 gap-4">
              {(products ?? []).map((p: { name: string; price: string; image?: string }, i: number) => <div key={i}><Img src={p.image} className="h-24 w-full rounded-xl" /><div className="mt-2 text-xs font-semibold text-secondary">{ml(p.name)}</div><div className="text-xs font-bold text-primary-dark">{p.price}</div></div>)}
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
            <h3 className="font-extrabold text-secondary">{ml(svTitle)}</h3>
            <div className="mt-5 grid grid-cols-2 gap-5">
              {(services ?? []).map((s: { label: string; image?: string }, i: number) => <div key={i} className="text-center"><Img src={s.image} className="mx-auto h-20 w-20 rounded-full" /><div className="mt-2 text-xs font-semibold text-secondary">{ml(s.label)}</div></div>)}
            </div>
          </div>
          <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
            <h3 className="font-extrabold text-secondary">{ml(bnTitle)}</h3>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {(brands ?? []).map((b: { image?: string }, i: number) => <Img key={i} src={b.image} className="h-16 rounded-xl bg-slate-50" />)}
            </div>
          </div>
        </div>
      </section>
    ),
  },

  /* ====== STRIP DE MARCAS ====== */
  BrandStripBlock: {
    label: "Strip de marcas",
    fields: { title: { type: "text", label: "Título" }, brands: { type: "array", label: "Logos", arrayFields: { image: imageField } } },
    defaultProps: { title: "Empresas y marcas que confían en nosotros", brands: [{}, {}, {}, {}, {}, {}, {}, {}, {}] },
    render: ({ title, brands }) => (
      <section className="border-y border-border bg-surface py-10">
        <div className="mx-auto max-w-7xl px-5">
          <p className="mb-6 text-center text-sm font-semibold text-muted">{ml(title)}</p>
          <div className="flex items-center gap-5">
            <div className="grid flex-1 grid-cols-3 gap-4 sm:grid-cols-5 lg:grid-cols-9">
              {(brands ?? []).map((b: { image?: string }, i: number) => <Img key={i} src={b.image} className="h-12 rounded-lg bg-white" />)}
            </div>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border text-muted"><ChevronRight className="h-5 w-5" /></span>
          </div>
        </div>
      </section>
    ),
  },

  /* ====== TESTIMONIOS ====== */
  TestimonialsBlock: {
    label: "Testimonios",
    fields: { title: { type: "text", label: "Título" }, items: { type: "array", label: "Testimonios", arrayFields: { name: { type: "text" }, quote: { type: "textarea" }, image: imageField } } },
    defaultProps: {
      title: "Lo que dicen nuestros Pet Parents",
      items: [
        { name: "María y Loki", quote: "IdentiPet me da tranquilidad sabiendo que Loki está siempre protegido." },
        { name: "Carlos y Nala", quote: "El historial médico de Nala siempre a la mano. Es súper completo y fácil de usar." },
        { name: "Ana y Max", quote: "Los beneficios y descuentos son increíbles, ya hemos ahorrado mucho." },
      ],
    },
    render: ({ title, items }) => (
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-8 flex items-center justify-between"><h2 className="text-2xl font-extrabold text-secondary">{ml(title)}</h2><a href="#" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-dark">Ver más <ArrowRight className="h-4 w-4" /></a></div>
          <div className="grid gap-6 md:grid-cols-3">
            {(items ?? []).map((t: { name: string; quote: string; image?: string }, i: number) => (
              <div key={i} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3"><Img src={t.image} className="h-12 w-12 rounded-full" /><div><div className="font-bold text-secondary">{ml(t.name)}</div><div className="flex text-amber-400">{[...Array(5)].map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}</div></div></div>
                <p className="mt-4 whitespace-pre-line text-sm text-muted">&ldquo;{ml(t.quote)}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    ),
  },

  /* ====== CTA APP ====== */
  AppCtaBlock: {
    label: "CTA Descarga app",
    fields: {
      title: { type: "text", label: "Título" }, brand: { type: "text", label: "Marca grande" }, subtitle: { type: "textarea", label: "Subtítulo" },
      leftImage: { ...imageField, label: "Imagen izquierda" },
      rightImages: { type: "array", label: "Imágenes derecha (duplica para agregar)", arrayFields: { image: imageField } },
    },
    defaultProps: { title: "Descarga la app de", brand: "IdentiPet", subtitle: "Muy pronto podrás llevar todo IdentiPet en tu bolsillo.", rightImages: [{}] },
    render: ({ title, brand, subtitle, leftImage, rightImages }) => (
      <section className="bg-primary">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-12 lg:grid-cols-[1fr_2fr_1fr]">
          <Img src={leftImage} className="hidden h-40 rounded-2xl lg:block" />
          <div className="text-center text-white">
            <h2 className="text-3xl font-extrabold">{ml(title)} <span className="block text-4xl">{ml(brand)}</span></h2>
            <p className="mt-2 whitespace-pre-line text-white/85">{ml(subtitle)}</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3"><div className="grid h-12 w-40 place-items-center rounded-xl bg-secondary text-xs text-white/80">Google Play</div><div className="grid h-12 w-40 place-items-center rounded-xl bg-secondary text-xs text-white/80">App Store</div></div>
          </div>
          <div className="hidden items-center justify-center gap-3 lg:flex">
            {(rightImages ?? []).map((r: { image?: string }, i: number) => <Img key={i} src={r.image} fit="contain" className="h-56 w-32" />)}
          </div>
        </div>
      </section>
    ),
  },
};
