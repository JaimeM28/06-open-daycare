<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## Comandos y verificación

- Usa npm (`package-lock.json`): `npm ci`, `npm run dev`, `npm run build`; `npm run start` requiere un build previo.
- Lint completo: `npm run lint`. Para un archivo concreto: `npx eslint app/page.tsx`. El lint completo también alcanza el JavaScript de `references/`.
- No hay scripts de test ni de typecheck, ni un runner de tests configurado. Para comprobar tipos, ejecuta primero `npx next typegen` y después `npx tsc --noEmit`: `app/layout.tsx` usa el tipo global generado `LayoutProps`.

## Contexto que importa

- La aplicación en `app/` aún es el starter de Next.js; `references/pantallas/*.dc.html` y `references/screenshots/` son referencias de diseño, no rutas implementadas. `references/pantallas/index.dc.html` es el índice de pantallas.
- `references/pantallas/support.js` es un runtime generado; no lo edites a mano. Su fuente `dc-runtime/` no está en este repositorio.
- `next.config.ts` activa `cacheComponents` y `partialPrefetching`; consulta la documentación incluida antes de asumir el comportamiento estándar de caché o renderizado.
- Tailwind se integra mediante `@tailwindcss/turbopack` en `next.config.ts` y `@import "tailwindcss"` en `app/globals.css`, no mediante una configuración PostCSS.
- `@/*` apunta a la raíz del repositorio, no a `app/` ni a `src/`.
- Para el flujo de especificaciones, consulta `.agents/skills/spec/SKILL.md` y `.agents/skills/spec-impl/SKILL.md`; la implementación exige una especificación aprobada por el usuario.

## Playwright

- Guarda capturas y cualquier otro artefacto de Playwright dentro de `.playwright-mcp/`.

## Reglas de codigo 
- Usar codigo limpio, nombres, funciones y variables en ingles. 