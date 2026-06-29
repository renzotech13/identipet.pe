import { NextResponse } from "next/server";
import { siteUrl } from "@/lib/config";

// El cierre de sesión real ocurre vía POST (signOutAction). Este GET NO cierra
// sesión: solo redirige, para que el prefetch de Next no destruya la sesión.
export async function GET() {
  return NextResponse.redirect(new URL("/", siteUrl));
}
