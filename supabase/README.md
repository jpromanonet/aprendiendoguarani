# Supabase setup (Nivel 1 — alumnos)

1. Creá un proyecto en https://supabase.com
2. En SQL Editor, corré el archivo `supabase/schema.sql`
   (incluye tablas, RLS y bucket `avatars` para la foto de perfil)
3. En Project Settings → API, copiá:
   - Project URL → `VITE_SUPABASE_URL`
   - `anon` `public` key → `VITE_SUPABASE_ANON_KEY`
4. Copiá `.env.example` a `.env.local` y pegá esos valores
5. En Auth → Providers, dejá Email habilitado
6. (Opcional) Auth → Settings → desactivá "Confirm email" mientras probás en local
7. `npm run dev`

## Login con Google

1. Google Cloud Console → APIs & Services → Credentials → Create OAuth client (Web)
2. Authorized redirect URI:
   `https://uxtjvnbqpbkjjtzdeecd.supabase.co/auth/v1/callback`
3. Supabase → Authentication → Providers → Google → Enable
4. Pegá Client ID y Client Secret
5. Authentication → URL Configuration:
   - Site URL: `https://aprendiendoguarani.vercel.app`
   - Redirect URLs:
     - `https://aprendiendoguarani.vercel.app/**`
     - `http://localhost:5173/**`

## Reglas de negocio

- Nivel 1 = **15 clases** → certificado
- Autoevaluación: **5 intentos absolutos** por clase (configurable en `src/data/quizzes.ts`)
- Aprobado desde **70%**
- Cada alumno solo ve su data (RLS)

## Flujo de contenido

Cuando mandes una clase nueva:
1. Se suma a `src/data/classes.ts`
2. Se arma el quiz en `src/data/quizzes.ts`
3. Deploy a Vercel (agregar las mismas env vars en Vercel → Settings → Environment Variables)
