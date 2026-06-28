/** Configuración del registro y pago. Edita aquí y haz push para actualizar. */
export const registroConfig = {
  precio: Number(process.env.NEXT_PUBLIC_REGISTRO_PRECIO ?? 80),
  moneda: "PEN" as const,
  whatsapp: process.env.NEXT_PUBLIC_REGISTRO_WHATSAPP ?? "51936076291",
  pago: {
    banco: "BBVA",
    titular: "Renzo Madrid",
    cuenta: "",
    cci: "",
    yape: "936076291",
    plin: "",
  },
};

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://identipet.pe";

export function money(n: number): string {
  const simbolo = registroConfig.moneda === "PEN" ? "S/" : "";
  return `${simbolo} ${n.toFixed(2)}`;
}
