<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Comandos y verificación

- Usa npm (`package-lock.json`): `npm ci`, `npm run dev`, `npm run build`; `npm run start` requiere un build previo.
- Lint de la aplicación: `npx eslint app`; de un archivo: `npx eslint app/page.tsx`. `npm run lint` también analiza `references/pantallas/support.js`, con errores previos de `ReactDOM.render` y asignación a `module`; distingue esos fallos de regresiones propias.
- No hay scripts de test ni de typecheck, ni un runner de tests configurado. Para comprobar tipos, ejecuta primero `npx next typegen` y después `npx tsc --noEmit`: `app/layout.tsx` usa el tipo global generado `LayoutProps`.

## Contexto que importa

- `/` implementa el feed; `/ninos` lista niños y filtra por nombre; `/nino/[id]` muestra sus perfiles. Feed, Niños, las tarjetas y «Volver a Niños» navegan; las acciones de gestión siguen inertes. No hay autenticación, API ni base de datos.
- `app/data/children.ts` es la fuente compartida de datos ficticios para listado y perfiles. Los ocho IDs se prerenderizan con `generateStaticParams`; los desconocidos llaman a `notFound()`. Usa `/nino/`, sin `ñ`: la ruta Unicode devolvió 404 en esta versión y el usuario autorizó cambiarla.
- `references/pantallas/*.dc.html` y `references/screenshots/` son referencias visuales, no rutas de la aplicación. El índice es `references/pantallas/index.dc.html`; se implementan `feed.dc.html`, `ninos.dc.html` y `perfil-nino.dc.html` (Mateo).
- `references/pantallas/support.js` es un runtime generado cuya fuente `dc-runtime/` no está en el repositorio: no lo edites ni lo importes a la aplicación.
- `next.config.ts` activa `cacheComponents` y `partialPrefetching`; consulta la documentación incluida antes de asumir el comportamiento estándar de caché o renderizado.
- Los componentes usan Tailwind, integrado mediante `@tailwindcss/turbopack` en `next.config.ts`, no PostCSS. `app/globals.css` define la paleta y enlaza `font-sans`/`font-heading` con Nunito/Fredoka de `next/font`; conserva el tema claro y `line-height: normal` para no alterar la referencia.
- `@/*` apunta a la raíz del repositorio, no a `app/` ni a `src/`.
- El README sigue siendo el del starter; no describe las fuentes ni la pantalla actuales.
- Nombres del código en inglés; comentarios en español solo cuando aporten valor.

## Especificaciones y comprobación visual

- Para definir o implementar specs, consulta `.agents/skills/spec/SKILL.md` y `.agents/skills/spec-impl/SKILL.md`. La implementación exige aprobación del usuario; `specs/.spec-config.yml` controla la creación de rama y los commits por paso.
- El subagente local `.opencode/agents/spec-verifier.md` verifica, corrige dentro del alcance y actualiza checks con evidencia, sin reescribir criterios ni cambiar el estado del spec.
- Playwright MCP está configurado en `opencode.json`; no hay una suite de Playwright Test. Guarda capturas, logs y cualquier otro artefacto en `.playwright-mcp/`.
- Compara el HTML de referencia y la aplicación con el mismo viewport y scroll, tras `document.fonts.ready`. En escritorio el scroll pertenece a `main`, no a `window`; en móvil se desplaza la página.
- Tras cambios de código, reconstruye y reinicia cualquier servidor `npm run start` usado para verificar: sirve el build, no los archivos fuente actuales.
