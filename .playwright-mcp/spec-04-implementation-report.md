# SPEC 04 — Verificación de implementación

Fecha: 2026-11-26.
Rama: `spec-04-add-child-and-mobile-navigation`.
Aplicación verificada: `http://localhost:3111` con build de producción actualizado.
Referencias: `http://127.0.0.1:3112`.

## Resultado

Los seis pasos de implementación están completados.
La especificación conserva su estado Aprobado y sus checks, pendientes de la verificación formal solicitada por el usuario.
No se crearon commits ni se modificaron las referencias originales.

## Comprobaciones

- `npm run build`: correcto; los ocho perfiles originales siguen prerenderizados.
- `npx next typegen` seguido de `npx tsc --noEmit`: correcto.
- `npx eslint app`: correcto.
- `git diff --check`: correcto, con avisos de conversión LF/CRLF, sin errores de espacios.
- `npm run lint`: conserva dos errores y ocho warnings previos exclusivamente en `references/pantallas/support.js`.
- Aserciones ejecutadas sobre las funciones de `app/lib/child-form.ts`: fechas inexistentes y bisiestas, fechas futuras, nombres vacíos, sala, edad antes/durante/después del cumpleaños, edad cero, alergias, datos por defecto e IDs únicos. Todas correctas.
- Script reproducible de interacción: `spec-04-checks.txt`, ejecutado mediante Playwright MCP sobre el build actual. Todos sus checks son satisfactorios; resultados en `spec-04-interaction-results.txt`.

## Evidencia funcional

- Modal sin cambio de URL, valores iniciales, errores asociados y foco en el primer campo inválido.
- Nombre vacío o con espacios y fechas inválidas/futuras bloqueados.
- Cancelar, Escape y clic fuera descartan el borrador; reabrir restaura campos vacíos y Soles.
- Guardado de dos niños con igual nombre y distinto ID, orden de alta, búsqueda y contador.
- Alergias normalizadas sin duplicados; notas opcionales; perfiles temporales sin padres.
- Estado conservado al navegar entre feed, listado y perfiles; reinicio al recargar o abrir otra pestaña.
- Perfil temporal recargado y ruta desconocida muestran no encontrado; los ocho perfiles originales siguen accesibles.
- Sin cookies, localStorage, sessionStorage ni solicitudes de escritura durante las altas.
- Foco contenido y restaurado, scroll de fondo bloqueado, cierres del menú y navegación móvil comprobados.
- Breakpoint verificado a 767 y 768 px; sidebar de escritorio de 248 px y hamburguesa móvil.
- Login y activación no incorporan navegación lateral.
- Formulario largo desplazable a 375 × 812, sin desbordamiento horizontal.
- Prueba adicional con nombre y alergia sin espacios de más de 120 caracteres: listado y perfil sin desbordamiento móvil; Niños permanece activo en el menú del perfil.
- Sin errores de ejecución ni hidratación. El log del navegador incluye un 404 del favicon del servidor de referencias, no de la aplicación.

## Evidencia visual

Capturas inspeccionadas con visión, tras `document.fonts.ready`:

- `spec-04-reference-desktop.png` y `spec-04-modal-desktop.png`, a 1440 × 900 y scroll superior.
- `spec-04-modal-mobile.png` y `spec-04-directory-mobile.png`, a 375 × 812.
- `spec-04-menu-mobile.png`, panel abierto y foco visible.
- `spec-04-validation-errors.png`, errores del formulario.
- `spec-04-temporary-profile.png`, perfil del alta.

La tarjeta mantiene posición, ancho de 520 px, fuentes, colores y campos de la referencia.
El campo de nombre coincide en posición y medidas: x=487, y=152, ancho=466 y alto=48 px.
Las diferencias deliberadas son el fondo modal, el foco visible, la sala seleccionable y los controles funcionales.

## Implementación y documentación

- Context7 y guías locales de Next.js 16.4.6 consultados para proveedor cliente, layout servidor, navegación, rutas y `notFound()`.
- Documentación de React consultada para sincronizar `showModal()` con efectos y limpieza.
- `cacheComponents` y `partialPrefetching` conservados.
- `ModalDialog` comparte foco, cierres y bloqueo del fondo entre formulario y navegación, sin dependencias nuevas.
- Se añadieron contención explícita de Tab y restauración explícita del foco tras detectar diferencias del comportamiento nativo al desmontar el diálogo.
- Las altas solo existen en memoria. Por el streaming de Next.js, un perfil temporal recargado puede mostrar la UI 404 con una respuesta HTTP 200; no se promete un estado HTTP 404 para datos que solo conoce el cliente.

## Pendiente

Verificación formal de los criterios con `spec-verifier` y cierre del estado por el usuario.
