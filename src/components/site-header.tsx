import Link from "next/link";
import { PawPrint } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { signOutAction } from "@/app/actions/auth";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-secondary">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
            <PawPrint className="h-5 w-5" />
          </span>
          Identi<span className="text-primary">Pet</span>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link href="/panel" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-secondary hover:border-primary">
                Mi panel
              </Link>
              <form action={signOutAction}>
                <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">
                  Salir
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-secondary hover:border-primary">
                Ingresar
              </Link>
              <Link href="/registro-mascota" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark">
                Registrar mascota
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
