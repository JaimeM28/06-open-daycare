# Verificación actual — SPEC 02

Spec: `specs/02-children-directory-and-profile.md`.
Resultado: **22/22 criterios verificados**, ninguno fallido o bloqueado. Estado conservado: **Aprobado**.
Numeración siguiente: orden de los criterios originales, sin modificar sus textos.

## Entorno y conservación del trabajo

- Se leyeron AGENTS.md, `.opencode/agents/spec-verifier.md`, las guías locales de spec/spec-impl, SPEC 01 y SPEC 02, componentes y datos asociados, configuración y referencias HTML.
- Se revisaron estado y diffs antes de editar. No se hicieron commits, cambios de rama ni modificaciones de referencias.
- El servidor previo 3010 correspondía a un build posterior a los fuentes iniciales (build 17:27:25, proceso 17:27:30). Para verificar además un build ejecutado en esta sesión sin detener procesos ajenos, se inició producción en **http://localhost:3012**. Se reconstruyó y reinició este servidor después de la corrección. Sigue disponible para revisión.
- Se reutilizó **http://127.0.0.1:3011**, cuyo proceso sirve `references/pantallas`. Se comprobó por HTTP que ambos HTML son idénticos byte a byte a los archivos actuales.
- No usar 3010 como prueba del código corregido: no fue reiniciado por este verificador.

## Corrección mínima

`app/components/children/child-card.tsx:15,20`: a 768 px, el avatar y las etiquetas dejaban solo 23–51 px al texto de algunas tarjetas. Se detectó desbordamiento interno y solapamiento de palabras. Se añadieron `md:max-lg:flex-wrap` y `md:max-lg:basis-[calc(100%_-_62px)]`: en 768–1023 px, el indicador pasa a otra fila sin comprimir el nombre. Se conservan dos columnas desde 768 px y el diseño de móvil/escritorio ancho.

Se repitieron build, tipos, ESLint de app y las pruebas completas de navegación, buscador, estados, acciones inertes, responsive y comparación visual tras la corrección.

## Evidencia por criterios

| Criterios | Comprobación actual y resultado |
| --- | --- |
| 1–2 | Ocho tarjetas, en orden Mateo, Sofía, Benjamín, Valentina, Tomás, Emma, Lucas, Olivia. DOM comparado con HTML: textos normalizados, edades, conteos, iniciales y colores iguales; etiquetas MANÍ, VINCULAR y LACTOSA correctas. Tarjetas 393×82 px, borde 18 px y sombra efectiva idéntica. Tailwind añade capas transparentes a box-shadow, sin diferencia visual. Fuente: `app/data/children.ts`; captura `02-current-directory-1440.png` frente a `02-current-directory-reference-desktop.png`. |
| 3–4 | Se pulsó cada una de las ocho tarjetas y se comprobó el nombre contra su tarjeta y URL. Después se abrió directamente cada URL y se recargó: los ocho nombres coincidieron en las tres modalidades. Script repetible: `02-current-check.txt`, ejecutado mediante Playwright MCP. |
| 5 | Mateo: 3 años, Soles, 12 mar 2022, feb 2025; nota completa de maní/frutos secos/inhalador. Lucía Fernández activa y Diego Fernández pendiente; ambos cuentan como vinculados. `app/data/children.ts`, `02-current-profile-1440.png` y `02-current-profile-reference-desktop.png`. |
| 6 | Se leyó en navegador el contenido de los otros siete perfiles: edades 2/3, notas, fechas fijas, sala Soles y padres coherentes con el listado. Conteos respectivos: 1, 2, 0, 1, 1, 1, 1. Datos compartidos en `app/data/children.ts`; sin API ni duplicación entre rutas. |
| 7 | Valentina: «Sin padres vinculados.» y control visual «Vincular padre», sin filas de padres. Captura `02-current-valentina-375.png`; `linked-parents.tsx`. |
| 8 | Dos IDs desconocidos: `no-existe-actual` y `mateo-fernandez-inexistente`. Ambos muestran exclusivamente 404 / This page could not be found y robots noindex, sin nombres ni datos de otro niño. Primeras solicitudes frías devolvieron 200 con streaming; posteriores devolvieron 404. Comportamiento documentado. Capturas `02-current-404-*.png`; resolución en `app/nino/[id]/page.tsx:7–15`. |
| 9–10 | Feed → `/`, Niños → `/ninos`, los ocho «Volver a Niños» → `/ninos`. `aria-current=page`: Feed en home y Niños en listado y los ocho perfiles. Se usaron selectores visibles porque Cache Components conserva rutas ocultas con Activity. |
| 11–14 | `SOFIA` → Sofía; `  mEnDeZ  ` → Sofía; `DIAZ` → Tomás; `Fernández` → Mateo. Cada filtro: 1 niño. `zz-no-match`: 0 niños y «No se encontraron niños». Vaciar: ocho nombres y 8 niños. Recarga con búsqueda: input vacío y ocho resultados. URL sin query string en todos los casos. Captura `02-current-search-empty.png`; `children-directory.tsx:8–16`. |
| 15 | Se comprobó disabled y se pulsaron físicamente por coordenadas todos los botones visibles en home, listado, Mateo y Valentina: ninguna navegación ni cambio de texto/datos. Incluye Agregar niño, Editar, Resumen, Vincular, Nueva publicación, Avisos, Mi cuenta, cierre y controles del feed. |
| 16 | Home comparada con feed.dc.html, arriba y abajo, a 1440×900, mismo scroll y fuentes cargadas. Tres publicaciones, textos, placeholder y contadores conservados. Capturas `02-current-feed-desktop.png`, `02-current-feed-reference-desktop.png`, `02-current-feed-bottom.png`, `02-current-feed-reference-bottom.png`. |
| 17 | Inspección con visión de ambas parejas referencia/app a 1440×900, zoom 100 %, scroll superior, tras document.fonts.ready. Fredoka y Nunito cargadas; colores, SVG, tamaños, alineaciones, bordes, sombras y espaciados coinciden visualmente. Sidebar 248 px; contenedores 880/820 px. Hover: translate 0px -2px y borde rgb(242,167,142), captura `02-current-card-hover.png`. |
| 18 | Inspección con visión a 375×812: todas las tarjetas y todos los bloques del perfil accesibles mediante scroll de página, sin desbordamiento ni cortes. Capturas `02-current-directory-375.png` y `02-current-profile-375.png`. Además 767, 768 y 1024: sin desbordamiento horizontal ni interno tras corregir tarjetas; scroll de main en escritorio. Evidencias `02-current-{directory,profile}-{767,768,1024}.png`. |
| 19 | Cero errores JS o hidratación en navegación, búsquedas y perfiles válidos; comprobación limpia final de `/`, `/ninos` y Mateo. El log acumulado contiene únicamente favicon ausente del servidor de referencias y respuestas HTTP404 deliberadas de IDs desconocidos: no son errores de ejecución/hidratación de las pantallas válidas. `02-current-console.log`. |
| 20 | Build, next typegen → tsc --noEmit, y ESLint app: todos exit 0, repetidos tras el cambio. Logs abajo. |
| 21 | Lint global ejecutado, exit 1: solo 2 errores y 8 warnings previos en references/pantallas/support.js. No se modificó su runtime. El criterio exige ejecutar y distinguir, no que lint global pase. |
| 22 | Todas las capturas, script reproducible, logs e informe de esta revisión están en `.playwright-mcp/`, con prefijo `02-current-`. Evidencias anteriores conservadas. |

## Comandos y resultados

- `npx next typegen`: exit 0 — `02-current-typegen.log`.
- `npx tsc --noEmit`, después de typegen: exit 0 — `02-current-tsc.log`.
- `npx eslint app`: exit 0 — `02-current-app-lint.log`.
- `npm run build`: exit 0 antes y después de corregir; Next 16.4.6, cacheComponents y partialPrefetching activos — `02-current-build.log`.
- `npm run start -- --port 3012`: servidor de producción propio, reiniciado tras construir la corrección.
- `npm run lint`: exit 1 — `02-current-global-lint.log`. Errores previos: ReactDOM.render obsoleto (196) y asignación a module (1089), más 8 warnings del mismo runtime.
- `git diff --check`: exit 0. Comparación normalizando exclusivamente checks y CRLF contra HEAD: `specOnlyChecks=True`. El diff del spec solo cambia las 22 marcas, sin tocar estado, texto, orden, decisiones ni alcance.
- Verificación HTTP de referencias contra archivos locales: `servedFromCurrentFile=True` para ambos HTML.

## Documentación y recomendaciones verificadas

Context7: resolución de Next.js y consulta de **/vercel/next.js/v16.4.5**, versión disponible más cercana a la instalada 16.4.6. Verificados params asíncronos, ocho generateStaticParams, notFound para desconocidos y ausencia de dynamicParams:false, incompatible con cacheComponents.

- [Migrating to Cache Components](https://github.com/vercel/next.js/blob/v16.4.5/docs/01-app/02-guides/migrating-to-cache-components.mdx).
- [not-found y códigos en streaming](https://github.com/vercel/next.js/blob/v16.4.5/docs/01-app/03-api-reference/03-file-conventions/not-found.mdx).
- Guías locales leídas en `node_modules/next/dist/docs/01-app/`: `03-api-reference/04-functions/not-found.md`, `generate-static-params.md`, `03-api-reference/03-file-conventions/dynamic-routes.md`, `not-found.md`, `02-guides/migrating-to-cache-components.md` y `01-getting-started/04-linking-and-navigating.md`. Las extensiones locales son .md, no .mdx.
- Context7 Tailwind: resolución y consulta **/tailwindlabs/tailwindcss.com** sobre rangos responsive. [Responsive design](https://github.com/tailwindlabs/tailwindcss.com/blob/main/src/docs/responsive-design.mdx) confirma `md:max-lg:` para limitar el ajuste a 768–1023 px. Instalado Tailwind 4.3.3; documentación de rama oficial v4, sin versión puntual disponible.
- Sin migraciones ni dependencias nuevas. No se impuso HTTP404 antes del streaming ni se añadieron Proxy o servicios para alterar el contrato.

## Pendientes y límites

Sin bloqueos de esta spec. Permanece el fallo previo de lint global fuera de alcance. Aprobación y cierre corresponden al usuario; el estado no se cambió a Implementado.
