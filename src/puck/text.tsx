import { Fragment, type ReactNode } from "react";

/** Tamaños de texto (Tailwind) para los selects del builder. */
export const textSizeMap: Record<string, string> = {
  xs: "text-xs", sm: "text-sm", base: "text-base", lg: "text-lg", xl: "text-xl",
  "2xl": "text-2xl", "3xl": "text-3xl", "4xl": "text-4xl", "5xl": "text-5xl", "6xl": "text-6xl", "7xl": "text-7xl",
};
export const textSizeOptions = [
  { label: "XS", value: "xs" }, { label: "S", value: "sm" }, { label: "M", value: "base" }, { label: "L", value: "lg" },
  { label: "XL", value: "xl" }, { label: "2XL", value: "2xl" }, { label: "3XL", value: "3xl" }, { label: "4XL", value: "4xl" },
  { label: "5XL", value: "5xl" }, { label: "6XL", value: "6xl" }, { label: "7XL", value: "7xl" },
];

/**
 * Convierte saltos de línea en texto a <br/> reales.
 * Interpreta tanto Enter (\n) como la etiqueta escrita "<br>" / "<br/>".
 * Úsalo en los render: {ml(texto)}
 */
export function ml(text?: string | null): ReactNode {
  if (text == null || text === "") return null;
  const parts = String(text).split(/\s*<br\s*\/?>\s*|\n/i);
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </Fragment>
  ));
}
