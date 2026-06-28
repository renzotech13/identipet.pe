"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { registroConfig } from "@/lib/config";

export type RegistroError = { error: string; redirectLogin?: boolean };

function str(v: FormDataEntryValue | null): string {
  return typeof v === "string" ? v.trim() : "";
}

/** Devuelve un error o redirige a la página de gracias (no retorna en éxito). */
export async function submitRegistro(
  _prev: RegistroError | undefined,
  formData: FormData
): Promise<RegistroError | undefined> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const admin = createAdminClient();

  // ---- Datos del dueño ----
  let ownerId = user?.id ?? null;
  const email = str(formData.get("email")).toLowerCase();
  const password = str(formData.get("password"));

  if (!ownerId) {
    // Si el formulario venía en modo "logueado" (sin campos de dueño) pero no hay
    // sesión, es que la sesión expiró: pedir iniciar sesión de nuevo.
    if (!email) {
      return { error: "Tu sesión expiró. Vuelve a iniciar sesión e inténtalo de nuevo.", redirectLogin: true };
    }

    const nombre = str(formData.get("nombre"));
    const apellido = str(formData.get("apellido"));
    const celular = str(formData.get("celular"));

    if (!nombre || !apellido) return { error:"Ingresa tu nombre y apellido." };
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return { error:"Ingresa un correo válido." };
    if (password.length < 8) return { error:"La contraseña debe tener al menos 8 caracteres." };

    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: "propietario",
        nombre,
        apellido,
        celular,
        tipo_documento: str(formData.get("tipo_documento")),
        numero_documento: str(formData.get("numero_documento")),
      },
    });

    if (createErr || !created?.user) {
      if (createErr?.message?.toLowerCase().includes("already")) {
        return { error:"Ya tienes una cuenta con ese correo. Inicia sesión.", redirectLogin: true };
      }
      return { error:"No se pudo crear la cuenta. Inténtalo de nuevo." };
    }
    ownerId = created.user.id;

    // Iniciar sesión en el servidor para establecer las cookies de sesión
    await supabase.auth.signInWithPassword({ email, password });
  }

  // ---- Datos de la mascota ----
  const nombreMascota = str(formData.get("mascota_nombre"));
  if (!nombreMascota) return { error:"Ingresa el nombre de tu mascota." };
  if (!formData.get("terminos")) return { error:"Debes aceptar los términos." };

  const pesoStr = str(formData.get("peso"));
  const peso = pesoStr ? Number(pesoStr) : null;

  // ---- Foto (a Supabase Storage) ----
  let fotoUrl: string | null = null;
  const file = formData.get("foto");
  if (file instanceof File && file.size > 0) {
    if (file.size <= 8 * 1024 * 1024 && file.type.startsWith("image/")) {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const path = `${ownerId}/${crypto.randomUUID()}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      const { error: upErr } = await admin.storage.from("pets").upload(path, buffer, {
        contentType: file.type,
        upsert: false,
      });
      if (!upErr) {
        fotoUrl = admin.storage.from("pets").getPublicUrl(path).data.publicUrl;
      }
    }
  }

  // ---- Crear mascota ----
  const sexo = ["macho", "hembra", "desconocido"].includes(str(formData.get("sexo")))
    ? str(formData.get("sexo"))
    : "desconocido";
  const repro = ["entero", "castrado", "esterilizado", "desconocido"].includes(str(formData.get("estado_reproductivo")))
    ? str(formData.get("estado_reproductivo"))
    : "desconocido";

  const { data: pet, error: petErr } = await admin
    .from("pets")
    .insert({
      owner_id: ownerId,
      nombre: nombreMascota,
      especie: str(formData.get("especie")) || "Perro",
      raza: str(formData.get("raza")) || null,
      sexo,
      fecha_nacimiento: str(formData.get("fecha_nacimiento")) || null,
      color: str(formData.get("color")) || null,
      peso,
      tiene_microchip: !!formData.get("tiene_microchip"),
      numero_chip: str(formData.get("numero_chip")) || null,
      caracteristicas: str(formData.get("caracteristicas")) || null,
      estado_reproductivo: repro,
      foto_url: fotoUrl,
    })
    .select("id, slug_publico, identipet_code")
    .single();

  if (petErr || !pet) {
    return { error:"No se pudo registrar la mascota. Inténtalo de nuevo." };
  }

  // ---- Contactos de emergencia ----
  const nombres = formData.getAll("contacto_nombre");
  const tels = formData.getAll("contacto_telefono");
  const rels = formData.getAll("contacto_relacion");
  const contactos = nombres
    .map((n, i) => ({
      pet_id: pet.id as number,
      nombre: str(n),
      telefono: str(tels[i] ?? null),
      relacion: str(rels[i] ?? null) || null,
      es_principal: i === 0,
    }))
    .filter((c) => c.nombre && c.telefono);
  if (contactos.length) {
    await admin.from("pet_contacts").insert(contactos);
  }

  // ---- Registro / pago pendiente ----
  await admin.from("registrations").insert({
    user_id: ownerId,
    pet_id: pet.id,
    monto: registroConfig.precio,
    moneda: registroConfig.moneda,
    metodo: "transferencia",
    estado: "pendiente",
  });

  redirect(`/registro-mascota/gracias/${pet.id}`);
}
