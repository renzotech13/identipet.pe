# IdentiPet 🐾

Plataforma PetTech para el registro digital de mascotas — **identipet.pe**.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Supabase (Postgres + Auth + Storage) · deploy en Vercel.

> Migrado desde la versión PHP/MySQL (archivada en `_legacy-php/`, ignorada por git).

---

## 1. Desarrollo local

Requisitos: **Node.js 18+**.

```bash
npm install
cp .env.example .env.local   # completa con tus claves de Supabase
npm run dev                  # http://localhost:3000
```

Estructura:

```
src/
├── app/                 # Rutas (App Router): páginas, layouts, API
│   ├── layout.tsx       # Layout raíz (fuente Lato, metadata)
│   ├── page.tsx         # Landing
│   └── globals.css      # Tema y marca (Tailwind v4 @theme)
├── components/ui/       # Componentes (shadcn) — ej. award-badge.tsx
└── lib/
    ├── utils.ts         # cn()
    └── supabase/        # Clientes Supabase (client/server)
supabase/migrations/     # Esquema SQL (0001_init.sql)
```

---

## 2. Crear el proyecto en Supabase

1. Entra a [supabase.com](https://supabase.com) → **New project** (elige región cercana, ej. South America).
2. Cuando esté listo, ve a **SQL Editor** → pega el contenido de `supabase/migrations/0001_init.sql` → **Run**.
   - Crea tablas (perfiles, mascotas, contactos, historial, registros…), el bucket de fotos `pets`, los triggers (número IdentiPet automático) y las políticas de seguridad (RLS).
3. Ve a **Project Settings → API** y copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (secreta)
4. Pégalas en tu `.env.local`.

---

## 3. Subir a GitHub

```bash
git init
git add .
git commit -m "IdentiPet: migración a Next.js + Supabase"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/identipet.git
git push -u origin main
```

(El `.gitignore` ya excluye `node_modules`, `.env*` y la carpeta `_legacy-php/`.)

---

## 4. Desplegar en Vercel

1. Entra a [vercel.com](https://vercel.com) → **Add New → Project** → importa el repo `identipet` de GitHub.
2. Framework: **Next.js** (se detecta solo).
3. En **Environment Variables**, agrega las mismas del `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` = `https://identipet.pe`
   - `NEXT_PUBLIC_REGISTRO_PRECIO` = `80`
   - `NEXT_PUBLIC_REGISTRO_WHATSAPP` = `51936076291`
4. **Deploy**. A partir de aquí, **cada `git push` despliega automáticamente** (con preview por cada rama). Ya no subes archivos a mano.

---

## 5. Conectar el dominio identipet.pe

1. En Vercel: **Project → Settings → Domains → Add** → `identipet.pe` (y `www.identipet.pe`).
2. Vercel te dará los registros DNS. En tu registrador del dominio:
   - Registro **A** de `identipet.pe` → la IP que indique Vercel (`76.76.21.21`), **o**
   - Registro **CNAME** de `www` → `cname.vercel-dns.com`.
3. Quita los nameservers/registros que apuntaban a SiteGround.
4. Espera la propagación; Vercel emite el certificado SSL automáticamente.

> SiteGround deja de usarse para hosting. El dominio sigue siendo tuyo; solo cambia a dónde apunta.

---

## 6. Roadmap de la migración

Ya migrado: **base del proyecto, marca, esquema Supabase, autenticación (clientes), landing + insignia holográfica**.

Pendiente de portar desde la versión PHP (en orden):
1. Autenticación (registro/login con Supabase Auth)
2. Asistente de registro de mascota con pago (S/ 80 + WhatsApp)
3. Panel del propietario y perfil de mascota (QR + carnet)
4. Página pública `/mascota/[slug]`
5. Panel de administrador (confirmar pagos)
6. Historial médico, recordatorios, gestor documental
7. Marketplace, club de beneficios, etc.

---

© IdentiPet — identipet.pe
