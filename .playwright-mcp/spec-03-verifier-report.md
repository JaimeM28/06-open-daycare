# Verificación SPEC 03 — 2026-11-26

Spec: `specs/03-login-and-account-activation.md`. Resultado: 24/24 criterios comprobados en esta ejecución, ninguno fallido o bloqueado. Estado conservado: Aprobado. Sin correcciones de implementación, dependencias, commits ni cambios de rama. Estado inicial de Git limpio.

## Entorno

Se reconstruyó el código actual y se inició un servidor propio en http://localhost:3103. Se evitó usar el servidor viejo 3100 y no se detuvieron servidores ajenos. Referencias reutilizadas en http://127.0.0.1:3101. El servidor 3103 queda disponible para la sesión principal.

## Evidencia por criterio (orden original)

Todas las rutas siguientes son relativas a `.playwright-mcp/` y llevan el prefijo `spec-03-verifier-`.

| Criterios | Comprobación y evidencia |
| --- | --- |
| 1–5 | `functional.json`: acceso directo, recarga, valores iniciales, etiquetas, edición, cada campo obligatorio vacío y email inválido en ambas rutas. Contraseñas inicialmente vacías y type=password. |
| 6–7 | `functional.json`: los dos formularios llegan a `/` tanto con botón como Enter; activación con consentimiento desmarcado en ambos casos. Contraseña de un carácter admitida. |
| 8–9 | `functional.json`: enlaces en ambos sentidos; recuperación visible como botón disabled sin href. Código: `app/components/auth/login-form.tsx`. |
| 10 | `functional.json`: 176 solicitudes GET, sin cuerpos ni valores introducidos en URL; localStorage, sessionStorage, cookies e IndexedDB vacíos tras cada envío. Formularios interceptan submit, resetean y hacen router.push('/') sin serializar valores. Revisados `login-form.tsx` y `activation-form.tsx`: sin llamadas de red, almacenamiento o logs. |
| 11 | `functional.json`: recargar después de editar restaura email/código, contraseña vacía y consentimiento marcado. |
| 12 | `public.json`, `regression.json`, capturas `regression-{feed,children,profile}-{app,reference}.png`: comparación visual a 1440×900; acceso directo y recarga de los ocho perfiles; búsqueda SOFIA y limpieza; navegación de vuelta/listado/perfil/feed; tres publicaciones y scroll independiente con sidebar estable. Capturas móviles adicionales `regression-*-375.png`. |
| 13 | `{login,activar-cuenta}-{app,reference}-desktop.png`, inspeccionadas con visión a 1440×900. Coinciden distribución, fuentes, colores, SVG, bordes y sombras; login elimina selector y recentra el formulario, activación deja contraseña vacía según lo acordado. |
| 14–15 | `{login,activar-cuenta}-{375,767,768}.png` y `responsive.json`. Inspección visual de 375×812 y del cambio de distribución en 768; sin overflow ni controles cortados. Activación tiene scroll vertical accesible, altura 897; login cabecera coral compacta sin promoción/pie. |
| 16–17 | `responsive.json`, `{login,activar-cuenta}-keyboard.png`: recorrido Tab por todos los controles, foco visible solid 2px, checkbox operable con Space. `functional.json`: labels asociados y checkbox real. Código: `auth-field.tsx`, `activation-form.tsx`. |
| 18 | `responsive.json`, `{login,activar-cuenta}-dark.png`: capturas claro/oscuro idénticas byte a byte en ambas rutas. Código: `app/globals.css`, color-scheme: light. |
| 19 | `functional.json`: cero pageerror o console.error durante interacciones reales. `console-errors.log`: único error agregado es favicon.ico 404 del servidor HTML de referencias, no de la aplicación; sin errores de ejecución/hidratación. |
| 20 | `build.log`: npm run build, código 0. |
| 21 | `typegen.log`, `types.log`: npx next typegen seguido de npx tsc --noEmit, ambos código 0. |
| 22 | `eslint.log`: npx eslint app, código 0. |
| 23 | `lint-global.log`: npm run lint, código 1 por 2 errores y 8 warnings preexistentes exclusivamente en references/pantallas/support.js (ReactDOM.render y asignación module). No es regresión; el criterio exige ejecutar y distinguir, no éxito global. |
| 24 | Todas las capturas comparativas en este directorio, mismo viewport 1440×900, scroll de window y main a 0, tras document.fonts.ready. Móviles a 375×812; puntos de ruptura 767/768×812. |

## Documentación consultada

- Context7: resolve-library-id para Next.js y query-docs sobre useRouter de App Router en formularios cliente. Biblioteca `/vercel/next.js`; devuelve documentación canary, sin afirmar correspondencia exacta con 16.4.6 instalada.
- https://github.com/vercel/next.js/blob/canary/docs/01-app/03-api-reference/04-functions/use-router.mdx
- https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/preserving-ui-state.mdx
- Guías de la versión instalada: `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-router.md` y `01-directives/use-client.md`.
- Verificado: useRouter importado de next/navigation solo en formularios use client; URL fija segura; Link para enlaces normales; reset explícito antes de navegar evita conservar credenciales con Activity/cacheComponents. Páginas de composición siguen siendo componentes servidor. Sin cambios de configuración de caché/prefetch ni migraciones.

## Incidencias de comprobación

Una ejecución de la prueba de regresión usó un selector `main` ambiguo tras navegación porque Activity conserva nodos ocultos. Se repitió con `main:visible` y pasó; no es fallo de implementación. Un primer intento de invocar esa prueba tuvo error de sintaxis en el envoltorio de herramienta y se repitió correctamente.

No hay bloqueos ni decisiones de implementación pendientes. La aprobación/cierre pertenece al usuario.
