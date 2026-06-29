"use client";

import { Render, type Data } from "@measured/puck";
import { config } from "@/puck/config";

/** Renderiza la landing a partir de los datos del builder (Puck). */
export function LandingRenderer({ data }: { data: Data }) {
  return <Render config={config} data={data} />;
}
