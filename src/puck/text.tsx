import { Fragment, type ReactNode } from "react";

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
