import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "IdentiPet — La identidad digital de tu mascota",
  description:
    "Registra a tu mascota y accede a su historial médico, carnet digital, código QR y beneficios exclusivos. Todo en una sola plataforma.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://identipet.pe"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
