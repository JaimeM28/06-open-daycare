# Verificación independiente — SPEC 05

Fecha: 2026-11-26. Spec: `specs/05-link-parent.md`.

**Resultado: 26 aprobados, 0 fallidos, 0 bloqueados/no comprobados.**

Se revisaron de nuevo los 26 criterios, sin reutilizar aprobados ni capturas anteriores. No se encontraron defectos que requirieran corregir la implementación. Los 26 checks ya estaban marcados y se conservan porque cuentan con evidencia nueva. No se editó el spec, su estado ni su sección de evidencia preexistente. Continúa **Aprobado**; el cierre corresponde al usuario.

## Entorno y conservación del trabajo

- Leídos `.opencode/agents/spec-verifier.md`, `AGENTS.md`, las guías locales de spec/spec-impl, SPEC 05 completo y SPEC 02 (dependencia).
- Revisados `git status --short`, `git diff`, archivos nuevos y convenciones antes de actuar. Los cambios previos del spec (incluidos estado y sección de evidencia), AGENTS e implementación se conservaron íntegramente.
- Reutilizados producción `http://localhost:3105` y referencias `http://127.0.0.1:3106/vincular-padre.dc.html`. No se iniciaron ni detuvieron procesos, ni se hicieron commits/cambios de rama.
- Solo se crearon artefactos `spec-05-verifier-*` en `.playwright-mcp/`. No se editaron fuentes ni referencias.

## Evidencia por criterio

La numeración corresponde al orden original del spec. El script reproducible `spec-05-verifier-functional.js` se ejecutó con el MCP de Playwright contra producción y finalizó con todas sus aserciones satisfactorias, `errors: []`, 177 solicitudes observadas y `writeRequests: []`.

| Nº | Resultado y evidencia nueva |
| --- | --- |
| 1 | Abierto y cerrado el modal en los ocho IDs originales, por acceso directo, sin cambiar URL. |
| 2 | En cada perfil se comprobó el nombre completo en cabecera y el primer nombre en la información del feed. |
| 3 | En los ocho: nombre/email vacíos y únicamente Mamá seleccionada. |
| 4 | Clic real en las etiquetas de Papá, Tutor/a y Mamá; solo un radio seleccionado en cada caso. |
| 5 | Envíos de campos vacíos, nombre con espacios y correo inválido mantuvieron el diálogo abierto. |
| 6 | `aria-invalid`, `aria-describedby` y mensajes presentes; foco en nombre primero, luego en email cuando solo este era inválido. |
| 7 | Botón y Enter: se probaron validación fallida y altas válidas. |
| 8 | Dos envíos válidos distintos en Mateo y uno en Sofía añadieron exactamente una fila cada uno, con parentesco y estado pendientes; ninguna fila de Mateo visible en Sofía. |
| 9 | `  Familiar Verificador  ` se mostró recortado; email con espacios exteriores se aceptó y su repetición en mayúsculas se rechazó y enfocó el email. |
| 10 | El mismo email pudo añadirse a Sofía tras ser utilizado en Mateo. |
| 11 | Lucía y Diego permanecieron visibles e intactos tras las altas. Tras recarga, el bloque completo coincidió con el original. El diff de `app/data/children.ts` solo amplía la unión del parentesco; los ocho niños y todos sus padres originales no cambian. |
| 12 | Navegación mediante enlaces perfil → listado → Sofía → Feed → listado → Mateo conservó las dos invitaciones de Mateo. |
| 13 | Recarga eliminó solo las filas nuevas y restauró exactamente el bloque original de Mateo. Otra pestaña tampoco mostró invitaciones de la primera. |
| 14 | X, Escape y clic real en backdrop cerraron y descartaron el texto y parentesco modificados. |
| 15 | Tras cada uno de los tres cierres se reabrió y comprobó formulario vacío y Mamá. |
| 16 | Foco inicial en nombre y restauración al disparador tras los tres cierres. Recorrido completo adicional de 10 Tab y 10 Shift+Tab: todo el foco quedó dentro, incluidos ambos extremos. |
| 17 | Overflow hidden en html/body/main visible, rueda fuera sin desplazamiento de fondo y clic sobre navegación del fondo sin navegar. En móvil el documento permaneció en scroll 0 mientras el diálogo con errores se desplazaba internamente. |
| 18 | Comprobados texto y captura de `7K4P9`, `Vence en 7 días` y aviso de demostración visible. |
| 19 | Sin solicitudes de escritura ni email de prueba en URL/cuerpo observado. localStorage y sessionStorage vacíos, cookie vacía. Inspección de proveedor/formulario/helper: solo estado React, sin persistencia ni envío. |
| 20 | Activación conserva código/email iniciales, sin sidebar ni selector de rol. Envío sin contraseña se bloqueó y enfocó contraseña. Contraseña ficticia y consentimiento desmarcado navegaron a `/`, sin escritura ni almacenamiento. Captura `spec-05-verifier-activation.png`; archivos auth sin diff. |
| 21 | Comparación visual con visión de `spec-05-verifier-reference-desktop.png` y `spec-05-verifier-desktop.png`, ambas 1440×900. Véase análisis visual abajo. |
| 22 | A 375×812 no hay overflow horizontal; todos los controles se utilizaron y un alta móvil válida produjo una sola fila. Con errores, scroll interno disponible y botón alcanzable. Capturas mobile, mobile-errors y mobile-errors-bottom. |
| 23 | Capturas de referencia/aplicación guardadas aquí con viewports iguales, zoom 1, fuentes loaded y scroll inicial 0. La referencia se esperó además a renderizar su contenido y dos frames para evitar capturar su runtime a medio pintar. |
| 24 | Observadores de pageerror/console durante la ejecución funcional: ningún error; ver `spec-05-verifier-console.log` (0 errores, 0 warnings). Tampoco hubo errores en la comprobación de activación/alta temporal. |
| 25 | Build, typegen, tsc y eslint app finalizaron con código 0; logs separados. |
| 26 | Lint global ejecutado: código 1 exclusivamente por 2 errores previos y 8 warnings de `references/pantallas/support.js`, sin cambios en referencias. |

## Comparación visual e interacciones adicionales

- Inspección con visión de las capturas reales, no solo árbol de accesibilidad. Coinciden tarjeta de 480 px, posición x=480/y=40 en escritorio, Nunito/Fredoka, paleta, cabecera, inputs, radios, bloque amarillo, SVG, bordes y sombra. La tarjeta de aplicación mide 711.97 px de alto: el aviso añadido desplaza el botón aproximadamente 35 px respecto a referencia. El anillo de foco inicial y backdrop sobre perfil son diferencias funcionales intencionadas.
- En móvil se adapta a 343 px exteriores con márgenes de 16 px y padding interior de 20 px (referencia tiene más margen/padding); ninguna pérdida de contenido. Altura interior normal 748 px; con errores, altura 762 px y contenido desplazable de 800 px. El botón permanece alcanzable y se pudo enviar.
- Breakpoints comprobados: 375, 639, 640, 767, 768 y 1024 px, sin overflow horizontal. Tarjeta máxima 480 px; top 24 px en móvil y 40 px desde 768.
- A 375×540 el scroll interno permite alcanzar el botón (y=444.375, alto=49), captura `spec-05-verifier-mobile-short.png`.
- Preferencia oscura conserva esquema claro y fondo `rgb(251, 244, 236)`: `spec-05-verifier-dark-preference.png`, también inspeccionada visualmente.
- Se creó un niño ficticio temporal por el formulario real, se abrió su perfil y se comprobó `Vincular padre` deshabilitado. Captura `spec-05-verifier-temporary.png`.
- Los fallos iniciales del guion fueron del arnés, no defectos de aplicación: runtime MCP sin require/import, clic sobre input sr-only en vez de su etiqueta, y conteo de texto en rutas ocultas conservadas por Next.js. Se corrigió el artefacto y se repitió de principio a fin satisfactoriamente. La comprobación de ausencia de filtración se hace sobre contenido visible, además de verificar el proveedor indexado por ID.

## Comandos y resultados

Orden de tipos respetado: `npx next typegen` y después `npx tsc --noEmit`.

| Comando | Salida | Log |
| --- | --- | --- |
| `npx next typegen` | 0 | `spec-05-verifier-typegen.log` |
| `npx tsc --noEmit` | 0 | `spec-05-verifier-typescript.log` |
| `npx eslint app` | 0 | `spec-05-verifier-eslint-app.log` |
| `npm run lint` | 1 (fallos previos de referencias) | `spec-05-verifier-eslint-global.log` |
| `npm run build` | 0, compilación y 16 páginas generadas | `spec-05-verifier-build.log` |

Errores globales previos: `support.js:196` ReactDOM.render obsoleto y `support.js:1089` asignación a module. No se ocultaron ni corrigieron fuera de alcance. La salida PowerShell incluye envoltorios `NativeCommandError` por avisos npm en stderr; los códigos registrados son los reales y build terminó correctamente.

## Revisión documental

Versiones instaladas según package.json/build: Next.js 16.4.6 y React 19.3.0. Context7 se consultó primero con resolve-library-id y luego query-docs, IDs `/vercel/next.js` y `/reactjs/react.dev`; sus respuestas apuntan a documentación canary/main, no garantizan un snapshot exacto de estas versiones. Se contrastó con la documentación de Next instalada:

- `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md:352-422` — proveedor cliente que acepta children, importado por layout servidor y situado dentro de body. Cumplido por `app/layout.tsx:27-35` y `parent-invitations-provider.tsx`.
- `node_modules/next/dist/docs/01-app/01-getting-started/03-layouts-and-pages.md:41-45` — layouts conservan estado durante navegación. Se verificó con navegación real y se comprobó que recarga/pestaña nueva no lo conserva.
- `node_modules/next/dist/docs/01-app/02-guides/adopting-partial-prefetching.md:15-21,50-79` — partialPrefetching depende de cacheComponents y reutiliza App Shell. Se conservaron ambos flags; las verificaciones esperan URL y encabezado visible del perfil antes de interactuar.
- Context7 Next: https://github.com/vercel/next.js/blob/canary/docs/01-app/01-getting-started/05-server-and-client-components.mdx — frontera cliente del proveedor sin convertir el layout completo.
- Context7 React: https://react.dev/reference/react/useState y https://react.dev/learn/updating-objects-in-state — updater funcional puro y copias inmutables. El proveedor añade por ID con spreads y evita duplicados sin mutar los datos originales; UUID se genera fuera del updater.

Sin discrepancias de implementación relevantes ni cambios/migraciones recomendados dentro de este alcance.

## Decisiones pendientes

Ningún bloqueo. Queda al usuario decidir aprobación final/cierre y eventual commit. No se ha marcado Implementado.
