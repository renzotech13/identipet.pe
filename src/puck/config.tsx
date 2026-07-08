"use client";

import type { ReactNode } from "react";
import type { Config } from "@measured/puck";
import {
  Star, PawPrint, Heart, ShieldCheck, Gift, MapPin, Stethoscope, Bell, Bone,
  Footprints, Siren, ShoppingBag, HeartPulse, Cpu, IdCard, BadgePercent,
  Building2, Users, Phone, Mail, Check, Camera, Award, Sparkles, type LucideIcon,
} from "lucide-react";
import { ImageField } from "./ImageField";
import { sectionComponents } from "./sections";
import { ml, textSizeMap, textSizeOptions } from "./text";

/* Íconos disponibles para el bloque "Icono" */
const iconMap: Record<string, LucideIcon> = {
  Huella: PawPrint, Corazón: Heart, Estrella: Star, Escudo: ShieldCheck, Regalo: Gift,
  Ubicación: MapPin, Veterinaria: Stethoscope, Campana: Bell, Hueso: Bone, Huellas: Footprints,
  Alerta: Siren, Bolsa: ShoppingBag, Pulso: HeartPulse, Chip: Cpu, Carnet: IdCard,
  Descuento: BadgePercent, Edificio: Building2, Usuarios: Users, Teléfono: Phone, Correo: Mail,
  Check: Check, Cámara: Camera, Premio: Award, Brillo: Sparkles,
};
const iconColorMap: Record<string, string> = {
  primary: "text-primary", secondary: "text-secondary", accent: "text-accent",
  muted: "text-muted", white: "text-white", amber: "text-amber-400",
};

/* ---- mapas de clases ---- */
const bgMap: Record<string, string> = {
  none: "",
  white: "bg-white",
  surface: "bg-surface",
  primary: "bg-primary text-white",
  secondary: "bg-secondary text-white",
  band: "bg-[#14431f] text-white",
  light: "bg-[#f9fbfb]",
};
const padMap: Record<string, string> = { none: "", sm: "py-6", md: "py-12", lg: "py-20" };
const alignMap: Record<string, string> = { left: "text-left", center: "text-center", right: "text-right" };
const colorMap: Record<string, string> = {
  secondary: "text-secondary",
  primary: "text-primary",
  muted: "text-muted",
  white: "text-white",
};
const gridColsMap: Record<number, string> = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" };

export const config: Config = {
  root: {
    fields: {
      customCss: { type: "textarea", label: "CSS personalizado (se aplica a toda la página)" },
    },
    defaultProps: { customCss: "" },
    render: ({ children, customCss }: { children?: ReactNode; customCss?: string }) => (
      <div className="min-h-screen bg-[#f9fbfb]">
        {customCss ? <style dangerouslySetInnerHTML={{ __html: customCss }} /> : null}
        {children}
      </div>
    ),
  },
  categories: {
    Secciones: { components: ["SiteHeaderBlock", "HeroBlock", "FeatureBarBlock", "NeedsBlock", "StatsRibbonBlock", "CardsRowBlock", "BrandStripBlock", "TestimonialsBlock", "AppCtaBlock"] },
    Básicos: { components: ["Section", "Columns", "Heading", "Text", "Button", "Image", "Icon", "Rating", "Stats", "Spacer"] },
  },
  components: {
    ...sectionComponents,

    /* ====== SECCIÓN (contenedor con fondo + slot) ====== */
    Section: {
      label: "Sección",
      fields: {
        background: { type: "select", label: "Fondo", options: [
          { label: "Claro", value: "light" }, { label: "Blanco", value: "white" }, { label: "Surface", value: "surface" },
          { label: "Verde", value: "primary" }, { label: "Navy", value: "secondary" }, { label: "Verde oscuro", value: "band" }, { label: "Ninguno", value: "none" },
        ]},
        padding: { type: "select", label: "Espaciado", options: [
          { label: "Pequeño", value: "sm" }, { label: "Mediano", value: "md" }, { label: "Grande", value: "lg" }, { label: "Ninguno", value: "none" },
        ]},
        cssId: { type: "text", label: "ID CSS (para tu CSS personalizado)" },
        cssClass: { type: "text", label: "Clases CSS" },
        content: { type: "slot" },
      },
      defaultProps: { background: "light", padding: "md" },
      render: ({ background, padding, cssId, cssClass, content: Content }) => (
        <section id={cssId || undefined} className={`${bgMap[background] ?? ""} ${padMap[padding] ?? ""} ${cssClass ?? ""}`}>
          <div className="mx-auto max-w-7xl px-5">
            <Content />
          </div>
        </section>
      ),
    },

    /* ====== COLUMNAS ====== */
    Columns: {
      label: "Columnas",
      fields: {
        count: { type: "select", label: "N° columnas", options: [{ label: "2", value: 2 }, { label: "3", value: 3 }, { label: "4", value: 4 }] },
        gap: { type: "select", label: "Separación", options: [{ label: "Pequeña", value: "gap-4" }, { label: "Mediana", value: "gap-6" }, { label: "Grande", value: "gap-10" }] },
        cssId: { type: "text", label: "ID CSS" },
        cssClass: { type: "text", label: "Clases CSS" },
        col1: { type: "slot" },
        col2: { type: "slot" },
        col3: { type: "slot" },
        col4: { type: "slot" },
      },
      defaultProps: { count: 2, gap: "gap-6" },
      render: ({ count, gap, cssId, cssClass, col1: C1, col2: C2, col3: C3, col4: C4 }) => {
        const cols = [C1, C2, C3, C4].slice(0, Number(count));
        return (
          <div id={cssId || undefined} className={`grid grid-cols-1 ${gridColsMap[Number(count)] ?? "md:grid-cols-2"} ${gap} ${cssClass ?? ""}`}>
            {cols.map((Col, i) => <div key={i}><Col /></div>)}
          </div>
        );
      },
    },

    /* ====== TÍTULO ====== */
    Heading: {
      label: "Título",
      fields: {
        text: { type: "textarea", label: "Texto (Enter = salto de línea)" },
        size: { type: "select", label: "Tamaño", options: [{ label: "Auto (según nivel)", value: "auto" }, ...textSizeOptions] },
        level: { type: "select", label: "Nivel (SEO)", options: [{ label: "H1", value: "h1" }, { label: "H2", value: "h2" }, { label: "H3", value: "h3" }] },
        align: { type: "select", label: "Alineación", options: [{ label: "Izquierda", value: "left" }, { label: "Centro", value: "center" }, { label: "Derecha", value: "right" }] },
        color: { type: "select", label: "Color", options: [{ label: "Navy", value: "secondary" }, { label: "Verde", value: "primary" }, { label: "Blanco", value: "white" }] },
        cssClass: { type: "text", label: "Clases CSS" },
      },
      defaultProps: { text: "Título nuevo", size: "auto", level: "h2", align: "left", color: "secondary" },
      render: ({ text, size, level, align, color, cssClass }) => {
        const auto = level === "h1" ? "text-5xl" : level === "h3" ? "text-2xl" : "text-3xl sm:text-4xl";
        const sizeCls = size && size !== "auto" ? textSizeMap[size] : auto;
        const cls = `whitespace-pre-line font-extrabold tracking-tight ${sizeCls} ${alignMap[align]} ${colorMap[color]} ${cssClass ?? ""}`;
        if (level === "h1") return <h1 className={cls}>{ml(text)}</h1>;
        if (level === "h3") return <h3 className={cls}>{ml(text)}</h3>;
        return <h2 className={cls}>{ml(text)}</h2>;
      },
    },

    /* ====== TEXTO ====== */
    Text: {
      label: "Texto",
      fields: {
        text: { type: "textarea", label: "Texto (Enter = salto de línea)" },
        size: { type: "select", label: "Tamaño", options: textSizeOptions },
        weight: { type: "select", label: "Grosor", options: [{ label: "Normal", value: "font-normal" }, { label: "Medio", value: "font-medium" }, { label: "Negrita", value: "font-bold" }] },
        align: { type: "select", label: "Alineación", options: [{ label: "Izquierda", value: "left" }, { label: "Centro", value: "center" }, { label: "Derecha", value: "right" }] },
        color: { type: "select", label: "Color", options: [{ label: "Gris", value: "muted" }, { label: "Navy", value: "secondary" }, { label: "Blanco", value: "white" }] },
        cssClass: { type: "text", label: "Clases CSS" },
      },
      defaultProps: { text: "Escribe aquí tu texto.", size: "lg", weight: "font-normal", align: "left", color: "muted" },
      render: ({ text, size, weight, align, color, cssClass }) => <p className={`whitespace-pre-line ${textSizeMap[size] ?? "text-lg"} ${weight} ${alignMap[align]} ${colorMap[color]} ${cssClass ?? ""}`}>{ml(text)}</p>,
    },

    /* ====== ICONO ====== */
    Icon: {
      label: "Icono",
      fields: {
        icon: { type: "select", label: "Icono", options: Object.keys(iconMap).map((k) => ({ label: k, value: k })) },
        size: { type: "number", label: "Tamaño (px)", min: 12, max: 200 },
        color: { type: "select", label: "Color", options: [{ label: "Verde", value: "primary" }, { label: "Navy", value: "secondary" }, { label: "Coral", value: "accent" }, { label: "Gris", value: "muted" }, { label: "Blanco", value: "white" }, { label: "Ámbar", value: "amber" }] },
        align: { type: "select", label: "Alineación", options: [{ label: "Izquierda", value: "left" }, { label: "Centro", value: "center" }, { label: "Derecha", value: "right" }] },
      },
      defaultProps: { icon: "Huella", size: 40, color: "primary", align: "left" },
      render: ({ icon, size, color, align }) => {
        const Ico = iconMap[icon] ?? PawPrint;
        const justify = align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start";
        return <div className={`flex ${justify}`}><Ico style={{ width: `${size}px`, height: `${size}px` }} className={iconColorMap[color] ?? "text-primary"} /></div>;
      },
    },

    /* ====== VALORACIÓN (estrellas) ====== */
    Rating: {
      label: "Valoración (estrellas)",
      fields: {
        stars: { type: "number", label: "Estrellas llenas (1-5)", min: 0, max: 5 },
        starSize: { type: "number", label: "Tamaño estrellas (px)", min: 10, max: 80 },
        score: { type: "text", label: "Puntaje (ej. 4.9/5)" },
        scoreSize: { type: "select", label: "Tamaño puntaje", options: textSizeOptions },
        label: { type: "text", label: "Etiqueta" },
        align: { type: "select", label: "Alineación", options: [{ label: "Izquierda", value: "left" }, { label: "Centro", value: "center" }] },
      },
      defaultProps: { stars: 5, starSize: 20, score: "4.9/5", scoreSize: "lg", label: "Valoración de usuarios", align: "left" },
      render: ({ stars, starSize, score, scoreSize, label, align }) => (
        <div className={align === "center" ? "text-center" : "text-left"}>
          <div className={`flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}>
            <div className="flex text-amber-400">
              {[...Array(Math.max(0, Math.min(5, Number(stars) || 0)))].map((_, i) => <Star key={i} style={{ width: `${starSize}px`, height: `${starSize}px` }} className="fill-current" />)}
            </div>
            {score && <span className={`font-extrabold text-secondary ${textSizeMap[scoreSize] ?? "text-lg"}`}>{score}</span>}
          </div>
          {label && <div className="mt-1 text-sm text-muted">{label}</div>}
        </div>
      ),
    },

    /* ====== BOTÓN ====== */
    Button: {
      label: "Botón",
      fields: {
        label: { type: "text", label: "Texto" },
        href: { type: "text", label: "Enlace (URL)" },
        variant: { type: "select", label: "Estilo", options: [{ label: "Sólido", value: "primary" }, { label: "Contorno", value: "outline" }] },
      },
      defaultProps: { label: "Botón", href: "#", variant: "primary" },
      render: ({ label, href, variant }) => (
        <a href={href} className={variant === "primary"
          ? "inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-dark"
          : "inline-flex rounded-xl border border-border px-6 py-3 font-semibold text-secondary hover:border-primary"}>
          {label}
        </a>
      ),
    },

    /* ====== IMAGEN ====== */
    Image: {
      label: "Imagen",
      fields: {
        image: { type: "custom", label: "Imagen", render: ({ onChange, value }) => <ImageField value={value} onChange={onChange} /> },
        alt: { type: "text", label: "Texto alternativo" },
        rounded: { type: "select", label: "Bordes", options: [{ label: "Ninguno", value: "rounded-none" }, { label: "Medio", value: "rounded-2xl" }, { label: "Círculo", value: "rounded-full" }] },
        height: { type: "number", label: "Alto (px)" },
      },
      defaultProps: { alt: "", rounded: "rounded-2xl", height: 280 },
      render: ({ image, alt, rounded, height }) =>
        image ? (
          <img src={image} alt={alt} style={{ height: height ? `${height}px` : undefined }} className={`w-full object-cover ${rounded}`} />
        ) : (
          <div style={{ height: height ? `${height}px` : 200 }} className={`flex w-full items-center justify-center bg-slate-200/70 text-sm text-slate-400 ${rounded}`}>
            Sube una imagen
          </div>
        ),
    },

    /* ====== ESTADÍSTICAS ====== */
    Stats: {
      label: "Estadísticas",
      fields: {
        items: {
          type: "array",
          label: "Items",
          arrayFields: { value: { type: "text", label: "Cifra" }, label: { type: "text", label: "Etiqueta" } },
          defaultItemProps: { value: "+0", label: "Etiqueta" },
        },
      },
      defaultProps: {
        items: [
          { value: "+25K", label: "Mascotas registradas" },
          { value: "+8K", label: "Familias felices" },
          { value: "+500", label: "Veterinarias aliadas" },
          { value: "+120", label: "Ciudades" },
        ],
      },
      render: ({ items }) => (
        <div className="rounded-3xl bg-[#14431f] px-8 py-9 text-white">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {(items ?? []).map((it: { value: string; label: string }, i: number) => (
              <div key={i}>
                <div className="text-3xl font-black">{ml(it.value)}</div>
                <div className="mt-1 text-xs text-white/70">{ml(it.label)}</div>
              </div>
            ))}
          </div>
        </div>
      ),
    },

    /* ====== ESPACIADOR ====== */
    Spacer: {
      label: "Espaciador",
      fields: { size: { type: "number", label: "Alto (px)" } },
      defaultProps: { size: 40 },
      render: ({ size }) => <div style={{ height: `${size}px` }} />,
    },
  },
};
