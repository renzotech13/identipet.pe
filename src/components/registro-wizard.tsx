"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PawPrint, Upload } from "lucide-react";
import { registroConfig, money } from "@/lib/config";
import { submitRegistro } from "@/app/registro-mascota/actions";

export function RegistroWizard({ loggedIn, userLabel }: { loggedIn: boolean; userLabel: string }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(loggedIn ? 2 : 1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fotoName, setFotoName] = useState("Ningún archivo seleccionado");
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const [contactos, setContactos] = useState([0]);
  const [hasChip, setHasChip] = useState(false);

  const pago = registroConfig.pago;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    setError(null);

    const fd = new FormData(formRef.current);
    // En éxito, la acción de servidor redirige; solo retorna aquí si hay error.
    const res = await submitRegistro(fd);

    if (res?.error) {
      setError(res.error);
      setLoading(false);
      if (res.redirectLogin) router.push("/login");
    }
  }

  const input = "w-full rounded-lg border border-border px-4 py-3 outline-none focus:border-primary";
  const label = "mb-1 block text-sm font-semibold text-secondary";
  const card = "rounded-2xl border border-border bg-white p-6 shadow-sm";

  return (
    <section className="mx-auto max-w-2xl px-5 py-10">
      <div className="text-center">
        <span className="text-sm font-bold uppercase tracking-widest text-primary-dark">Registro IdentiPet</span>
        <h1 className="mt-1 text-3xl font-extrabold text-secondary">Registra a tu mascota</h1>
        <p className="mt-1 text-muted">
          Identidad digital, carnet con QR y página pública. Registro por <strong>{money(registroConfig.precio)}</strong>.
        </p>
      </div>

      {/* Progreso */}
      <div className="my-7 flex items-center justify-center gap-2">
        {(loggedIn ? [2, 3] : [1, 2, 3]).map((n, i, arr) => (
          <div key={n} className="flex items-center gap-2">
            <div className={`grid h-10 w-10 place-items-center rounded-full font-extrabold text-white ${step >= n ? "bg-primary" : "bg-border"}`}>
              {n}
            </div>
            {i < arr.length - 1 && <div className={`h-1 w-14 ${step > n ? "bg-primary-dark" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {error && <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
        {/* PASO 1: DUEÑO */}
        {!loggedIn && (
          <div className={step === 1 ? "block space-y-5" : "hidden"}>
            <div className={card}>
              <h3 className="mb-4 font-bold text-secondary">Tus datos (dueño)</h3>
              <div className="mb-4">
                <label className={label}>País</label>
                <input className={`${input} bg-surface`} value="Perú" readOnly />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className={label}>Nombre *</label><input name="nombre" className={input} /></div>
                <div><label className={label}>Apellido *</label><input name="apellido" className={input} /></div>
              </div>
              <div className="mt-4"><label className={label}>Correo electrónico *</label><input type="email" name="email" className={input} /></div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div><label className={label}>Celular *</label><input type="tel" name="celular" className={input} /></div>
                <div>
                  <label className={label}>Tipo de documento</label>
                  <select name="tipo_documento" className={input} defaultValue="DNI">
                    {["DNI", "CE", "Pasaporte", "RUC"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div><label className={label}>Número de documento</label><input name="numero_documento" className={input} /></div>
                <div><label className={label}>Contraseña *</label><input type="password" name="password" placeholder="Mínimo 8 caracteres" className={input} /></div>
              </div>
              <p className="mt-3 text-sm text-muted">
                Creamos tu cuenta para administrar a tu mascota. ¿Ya tienes cuenta? <Link href="/login" className="text-primary-dark">Inicia sesión</Link>.
              </p>
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={() => setStep(2)} className="rounded-lg bg-primary px-7 py-3 font-semibold text-white hover:bg-primary-dark">Continuar</button>
            </div>
          </div>
        )}

        {/* PASO 2: MASCOTA */}
        <div className={step === 2 ? "block space-y-5" : "hidden"}>
          {loggedIn && <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">Registrando como <strong>{userLabel}</strong></div>}
          <div className={card}>
            <h3 className="mb-4 font-bold text-secondary">Datos de tu mascota</h3>
            <div className="mb-4 flex items-center gap-4">
              <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-primary-50 text-primary">
                {fotoPreview ? <img src={fotoPreview} alt="" className="h-full w-full object-cover" /> : <PawPrint className="h-9 w-9" />}
              </div>
              <div>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark">
                  <Upload className="h-4 w-4" /> Elegir foto
                  <input type="file" name="foto" accept="image/*" className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) { setFotoName(f.name); setFotoPreview(URL.createObjectURL(f)); }
                    }} />
                </label>
                <p className="mt-2 text-sm text-muted">{fotoName}</p>
              </div>
            </div>
            <div><label className={label}>Nombre de la mascota *</label><input name="mascota_nombre" className={input} /></div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label}>Especie</label>
                <select name="especie" className={input} defaultValue="Perro">
                  {["Perro", "Gato", "Ave", "Conejo", "Otro"].map((e) => <option key={e}>{e}</option>)}
                </select>
              </div>
              <div><label className={label}>Raza</label><input name="raza" className={input} /></div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label}>Sexo</label>
                <select name="sexo" className={input} defaultValue="desconocido">
                  <option value="macho">Macho</option><option value="hembra">Hembra</option><option value="desconocido">No especificar</option>
                </select>
              </div>
              <div><label className={label}>Fecha de nacimiento</label><input type="date" name="fecha_nacimiento" className={input} /></div>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div><label className={label}>Color</label><input name="color" className={input} /></div>
              <div><label className={label}>Peso (kg)</label><input type="number" step="0.01" min="0" name="peso" className={input} /></div>
            </div>
            <div className="mt-4">
              <label className="flex items-center gap-2 text-sm text-secondary">
                <input type="checkbox" name="tiene_microchip" value="1" checked={hasChip} onChange={(e) => setHasChip(e.target.checked)} /> Tiene microchip
              </label>
            </div>
            {hasChip && <div className="mt-3"><label className={label}>Número de microchip</label><input name="numero_chip" className={input} /></div>}
            <div className="mt-4"><label className={label}>Características / señas</label><textarea name="caracteristicas" rows={2} className={input} /></div>
          </div>

          <div className={card}>
            <h3 className="font-bold text-secondary">Contacto de emergencia</h3>
            <p className="mb-4 text-sm text-muted">Se mostrará si tu mascota se pierde.</p>
            {contactos.map((c) => (
              <div key={c} className="mb-3 grid gap-3 sm:grid-cols-3">
                <input name="contacto_nombre" placeholder="Nombre" className={input} />
                <input name="contacto_telefono" placeholder="Teléfono / WhatsApp" className={input} />
                <input name="contacto_relacion" placeholder="Relación" className={input} />
              </div>
            ))}
            <button type="button" onClick={() => setContactos([...contactos, contactos.length])} className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-secondary hover:border-primary">+ Otro contacto</button>
          </div>

          <div className="flex justify-between">
            {loggedIn ? <Link href="/panel" className="rounded-lg border border-border px-5 py-3 font-semibold text-secondary">Cancelar</Link>
              : <button type="button" onClick={() => setStep(1)} className="rounded-lg border border-border px-5 py-3 font-semibold text-secondary">Atrás</button>}
            <button type="button" onClick={() => setStep(3)} className="rounded-lg bg-primary px-7 py-3 font-semibold text-white hover:bg-primary-dark">Continuar al pago</button>
          </div>
        </div>

        {/* PASO 3: PAGO */}
        <div className={step === 3 ? "block space-y-5" : "hidden"}>
          <div className={card}>
            <h3 className="mb-3 font-bold text-secondary">Pago del registro</h3>
            <div className="my-4 text-center">
              <div className="text-4xl font-black text-primary-dark">{money(registroConfig.precio)}</div>
              <p className="mt-1 text-sm text-muted">Incluye número IdentiPet, carnet con QR y página pública.</p>
            </div>
            <div className="rounded-lg border border-dashed border-primary bg-surface p-4 text-sm">
              <p className="mb-2 font-bold text-secondary">Transferencia / Yape</p>
              {pago.banco && <Row k="Banco" v={pago.banco} />}
              {pago.titular && <Row k="Titular" v={pago.titular} />}
              {pago.cuenta && <Row k="Cuenta" v={pago.cuenta} />}
              {pago.cci && <Row k="CCI" v={pago.cci} />}
              {pago.yape && <Row k="Yape" v={pago.yape} />}
            </div>
            <p className="mt-3 text-xs text-muted">Al finalizar te daremos el botón para enviar tu comprobante por WhatsApp. Activamos tu registro al confirmarlo.</p>
            <label className="mt-4 flex items-center gap-2 text-sm text-secondary">
              <input type="checkbox" name="terminos" value="1" /> Acepto los términos y la política de privacidad.
            </label>
          </div>
          <div className="flex justify-between">
            <button type="button" onClick={() => setStep(2)} className="rounded-lg border border-border px-5 py-3 font-semibold text-secondary">Atrás</button>
            <button type="submit" disabled={loading} className="rounded-lg bg-accent px-7 py-3 font-semibold text-white hover:bg-accent-dark disabled:opacity-60">
              {loading ? "Registrando…" : "Registrar mascota"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-1.5 last:border-0">
      <span className="text-muted">{k}</span>
      <span className="font-semibold text-secondary">{v}</span>
    </div>
  );
}
