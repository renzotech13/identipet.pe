"use client";

import { useActionState } from "react";
import Link from "next/link";
import { PawPrint } from "lucide-react";
import { login } from "./actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

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

          {state?.error && (
            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</div>
          )}

          <form action={formAction} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold text-secondary">Correo electrónico</label>
              <input type="email" name="email" required
                className="w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-primary" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-secondary">Contraseña</label>
              <input type="password" name="password" required
                className="w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-primary" />
            </div>
            <button type="submit" disabled={pending}
              className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-white hover:bg-primary-dark disabled:opacity-60">
              {pending ? "Ingresando…" : "Ingresar"}
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
