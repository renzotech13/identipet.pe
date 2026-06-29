"use client";

import type { ReactNode } from "react";
import type { Config } from "@measured/puck";
import { ImageField } from "./ImageField";
import { sectionComponents } from "./sections";

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
    render: ({ children }: { children?: ReactNode }) => (
      <div className="min-h-screen bg-[#f9fbfb]">{children}</div>
    ),
  },
  categories: {
    Secciones: { components: ["SiteHeaderBlock", "HeroBlock", "FeatureBarBlock", "NeedsBlock", "StatsRibbonBlock", "CardsRowBlock", "BrandStripBlock", "TestimonialsBlock", "AppCtaBlock"] },
    Básicos: { components: ["Section", "Columns", "Heading", "Text", "Button", "Image", "Stats", "Spacer"] },
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
        content: { type: "slot" },
      },
      defaultProps: { background: "light", padding: "md" },
      render: ({ background, padding, content: Content }) => (
        <section className={`${bgMap[background] ?? ""} ${padMap[padding] ?? ""}`}>
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
        col1: { type: "slot" },
        col2: { type: "slot" },
        col3: { type: "slot" },
        col4: { type: "slot" },
      },
      defaultProps: { count: 2, gap: "gap-6" },
      render: ({ count, gap, col1: C1, col2: C2, col3: C3, col4: C4 }) => {
        const cols = [C1, C2, C3, C4].slice(0, Number(count));
        return (
          <div className={`grid grid-cols-1 ${gridColsMap[Number(count)] ?? "md:grid-cols-2"} ${gap}`}>
            {cols.map((Col, i) => <div key={i}><Col /></div>)}
          </div>
        );
      },
    },

    /* ====== TÍTULO ====== */
    Heading: {
      label: "Título",
      fields: {
        text: { type: "text", label: "Texto" },
        level: { type: "select", label: "Nivel", options: [{ label: "H1", value: "h1" }, { label: "H2", value: "h2" }, { label: "H3", value: "h3" }] },
        align: { type: "select", label: "Alineación", options: [{ label: "Izquierda", value: "left" }, { label: "Centro", value: "center" }, { label: "Derecha", value: "right" }] },
        color: { type: "select", label: "Color", options: [{ label: "Navy", value: "secondary" }, { label: "Verde", value: "primary" }, { label: "Blanco", value: "white" }] },
      },
      defaultProps: { text: "Título nuevo", level: "h2", align: "left", color: "secondary" },
      render: ({ text, level, align, color }) => {
        const size = level === "h1" ? "text-5xl" : level === "h3" ? "text-2xl" : "text-3xl sm:text-4xl";
        const cls = `font-extrabold tracking-tight ${size} ${alignMap[align]} ${colorMap[color]}`;
        if (level === "h1") return <h1 className={cls}>{text}</h1>;
        if (level === "h3") return <h3 className={cls}>{text}</h3>;
        return <h2 className={cls}>{text}</h2>;
      },
    },

    /* ====== TEXTO ====== */
    Text: {
      label: "Texto",
      fields: {
        text: { type: "textarea", label: "Texto" },
        align: { type: "select", label: "Alineación", options: [{ label: "Izquierda", value: "left" }, { label: "Centro", value: "center" }, { label: "Derecha", value: "right" }] },
        color: { type: "select", label: "Color", options: [{ label: "Gris", value: "muted" }, { label: "Navy", value: "secondary" }, { label: "Blanco", value: "white" }] },
      },
      defaultProps: { text: "Escribe aquí tu texto.", align: "left", color: "muted" },
      render: ({ text, align, color }) => <p className={`text-lg ${alignMap[align]} ${colorMap[color]}`}>{text}</p>,
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
                <div className="text-3xl font-black">{it.value}</div>
                <div className="mt-1 text-xs text-white/70">{it.label}</div>
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
