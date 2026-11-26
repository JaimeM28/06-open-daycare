# SPEC 02 — Verificación de implementación

## Entorno

- Aplicación: build de producción actual servido en `http://localhost:3010`.
- Referencias: `http://127.0.0.1:3011/ninos.dc.html` y `perfil-nino.dc.html`.
- El usuario autorizó sustituir `/niño/[id]` por `/nino/[id]` tras comprobar que la ruta Unicode devolvía 404.

## Comandos

- `npm run build`: correcto, incluye los ocho perfiles prerenderizados.
- `npx next typegen` seguido de `npx tsc --noEmit`: correctos.
- `npx eslint app`: correcto.
- `npm run lint`: 2 errores y 8 advertencias previos, todos en `references/pantallas/support.js`.
- `git diff --check`: correcto; solo advertencias de conversión LF/CRLF.

## Navegación y datos

- Feed → Niños y perfiles → Feed funcionan.
- Las ocho tarjetas abren su URL `/nino/{id}` y «Volver a Niños» regresa al listado.
- Acceso directo de los ocho perfiles: HTTP 200; recarga conserva el perfil correcto.
- Niños permanece activo en los perfiles; el feed conserva sus tres publicaciones.
- Los controles de gestión de los perfiles están deshabilitados.
- Valentina presenta «Sin padres vinculados.» y el control visual para vincular.
- ID inexistente: interfaz 404 y robots `noindex`, sin mostrar datos de un niño. Se observó HTTP 200 en una respuesta inicial con streaming y 404 en peticiones posteriores; es el comportamiento documentado de `notFound()` con streaming.
- No se observaron excepciones de aplicación mediante `pageerror` durante el recorrido funcional.

## Búsqueda

| Consulta | Resultados | Contador |
| --- | --- | --- |
| `SOFIA` | Sofía Méndez | 1 niño |
| `  Méndez  ` | Sofía Méndez | 1 niño |
| `Fernandez` | Mateo Fernández | 1 niño |
| `zzzz` | No se encontraron niños | 0 niños |
| Vacía | Los ocho niños | 8 niños |

La recarga limpia la búsqueda y restaura las ocho tarjetas.

## Verificación visual

Capturas de escritorio a 1440 × 900, con fuentes cargadas y scroll al inicio:

- `02-children-reference-desktop.png` y `02-children-app-desktop.png`.
- `02-profile-reference-desktop.png` y `02-profile-app-desktop.png`.

Las capturas se inspeccionaron visualmente. Se ajustó el padding del input para igualar sus 48 px de altura exterior con la referencia.
El contenedor del listado mide 880 px; el de perfil, 820 px; el sidebar, 248 px.
El h1 de Mateo coincide en posición y dimensiones: x=576, y=73, ancho=221.1875, alto=68 px.

Sin desbordamiento horizontal ni elementos del contenido fuera del viewport en anchos 320, 375, 767, 768 y 1024 px, tanto en el listado como en los perfiles de Mateo y Valentina.

Capturas móviles completas a 375 × 812, inspeccionadas visualmente:

- `02-children-mobile.png`.
- `02-profile-mobile.png`.
- `02-empty-parents-mobile.png`.

## Documentación consultada

- Context7: Next.js 16.4.5, versión disponible más cercana a la instalada 16.4.6; rutas dinámicas y restricciones de `cacheComponents`.
- Guías locales: `dynamic-routes.md`, `generate-static-params.md`, `link.md` y `not-found.md`.
- Se usan `params` asíncronos, `generateStaticParams`, `next/link` y `notFound()`; no se introduce `dynamicParams: false`.

El estado y los checks del spec no se modificaron durante la implementación. Solo se actualizó su decisión de rutas autorizada por el usuario.
