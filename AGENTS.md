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

- `/` implementa el feed; `/ninos` lista niños, filtra por nombre y permite agregarlos mediante un modal; `/nino/[id]` muestra sus perfiles y permite vincular familiares a los ocho niños originales. Feed, Niños, las tarjetas y «Volver a Niños» navegan; el resto de las acciones de gestión sigue inerte. No hay autenticación, API ni base de datos.
- `/login` y `/activar-cuenta` son demos navegables sin selector de rol ni sesión real. Usan validación nativa y envían al feed `/` sin transmitir ni persistir credenciales. El consentimiento de fotos es opcional y no se guarda; recuperación de contraseña permanece inerte. Ambas rutas omiten el sidebar y reutilizan `app/components/auth/`.
- `app/data/children.ts` conserva los ocho niños ficticios originales y sus IDs prerenderizados con `generateStaticParams`. `ChildrenProvider`, montado en el layout raíz, añade niños solo en memoria durante la navegación; recargar o abrir otra pestaña los pierde. Sus IDs `temporary-<UUID>` se resuelven con `TemporaryChildProfile` y muestran no encontrado si ya no existen; el resto de IDs desconocidos llama a `notFound()` en servidor. Usa `/nino/`, sin `ñ`.
- `app/lib/child-form.ts` valida nombre sin espacios vacíos, fecha local `dd/mm/aaaa` válida no futura y sala Soles. Calcula edad al guardar, deduplica alergias separadas por comas y crea perfiles sin padres. Solo deben introducirse datos ficticios; no se persisten ni se envían por red.
- El sidebar conserva 248 px desde 768 px. En móvil, `MobileNavigation` muestra cabecera y hamburguesa; el panel cierra con X, Escape, clic fuera o navegación y se desmonta al pasar a escritorio. Login y activación no tienen navegación lateral.
- `ParentInvitationsProvider`, montado en el layout raíz, conserva invitaciones pendientes por niño solo en memoria. El modal de vinculación admite Mamá, Papá y Tutor/a, valida campos y bloquea emails repetidos entre invitaciones nuevas del mismo niño. No envía correos ni conecta con activación; `7K4P9` y su vencimiento son ilustrativos. Recargar elimina las invitaciones nuevas y los niños temporales mantienen la vinculación deshabilitada.
- `app/components/ui/modal-dialog.tsx` comparte el `<dialog>` nativo entre alta, vinculación y menú móvil: gestiona foco e interacción modal y bloquea el scroll de la página y los `main` de escritorio, restaurándolo al cerrar. Alta y vinculación cancelan sin confirmación ni borrador.
- `references/pantallas/*.dc.html` y `references/screenshots/` son referencias visuales, no rutas de la aplicación. El índice es `references/pantallas/index.dc.html`; se implementan `feed.dc.html`, `ninos.dc.html`, `perfil-nino.dc.html` (Mateo), `login.dc.html`, `activar-cuenta.dc.html`, `agregar-nino.dc.html` y `vincular-padre.dc.html` (los dos últimos como modales).
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
