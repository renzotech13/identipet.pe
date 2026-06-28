"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Correo o contraseña incorrectos.");
      setLoading(false);
      return;
    }
    router.push("/panel");
    router.refresh();
  }

  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <aside className="hidden flex-col justify-center bg-gradient-to-br from-secondary to-primary-dark p-14 text-white md:flex">
        <Link href="/" className="mb-8 flex items-center gap-2 text-2xl font-extrabold">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
            <PawPrint className="h-6 w-6" />
          </span>
          IdentiPet
        </Link>
        <h2 className="text-3xl font-extrabold">Todo sobre tu mascota, en un solo lugar.</h2>
        <p className="mt-3 text-white/90">Accede a su historial, carnet, QR y beneficios.</p>
      </aside>

      <main className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-extrabold text-secondary">Iniciar sesión</h1>
          <p className="mt-1 text-muted">Accede a tu cuenta IdentiPet.</p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-secondary">Correo electrónico</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-primary" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-secondary">Contraseña</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-primary" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white hover:bg-primary-dark disabled:opacity-60">
              {loading ? "Ingresando…" : "Ingresar"}
            </button>
          </form>

          <p className="mt-6 text-center text-muted">
            ¿No tienes cuenta? <Link href="/registro-mascota" className="font-semibold text-primary-dark">Registra tu mascota</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
