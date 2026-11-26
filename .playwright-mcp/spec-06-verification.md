# Verificación de SPEC 06

Fecha: 2026-11-26.
Rama: `spec-06-create-post`.
Aplicación: build de producción en `http://localhost:3110`.
Referencia: `http://127.0.0.1:3111/crear-publicacion.dc.html`.

## Resultado

43 criterios comprobados satisfactoriamente.
Sin cambios de estado ni commits.
Todas las pruebas usan datos ficticios.

## Formulario y publicación — criterios 1–20

- Ambos accesos abren el mismo diálogo en el feed sin cambiar la URL.
- El menú de escritorio abre el formulario desde listado y perfil; se publicó desde ambos y se esperó la URL `/` y la tarjeta nueva.
- En móvil se abrió desde el menú y desde el feed.
- Un MutationObserver comprobó un máximo de un `dialog[open]` durante el paso del menú al formulario.
- Se comprobaron nueve checkboxes: ocho niños originales y toda la sala.
- Valores iniciales verificados: Mateo, Actividad y texto vacío.
- Seleccionar sala limpia los niños y seleccionar un niño desactiva sala.
- Desmarcar Mateo y enviar vacío muestra errores de destinatarios y descripción, enfocando el primer checkbox.
- Descripción con solo espacios se rechaza y enfoca el textarea; los demás valores se conservan.
- Errores asociados mediante `aria-describedby` y `aria-invalid` en grupo, checkbox y textarea.
- Se seleccionaron y publicaron los siete tipos; solo un radio quedó seleccionado en cada paso.
- Enter en el textarea inserta un salto de línea sin publicar.
- Una selección Mateo + Sofía creó una sola tarjeta con sus nombres, hora local `HH:mm`, contadores a cero y texto recortado con salto de línea.
- Sala completa creó una sola tarjeta con «Toda la sala».
- Las nuevas tarjetas se anteponen en orden de creación inverso.
- Se comprobó para cada tipo que solo Foto muestra el placeholder genérico, sin archivo.
- «Agregar» está deshabilitado y no existe input de archivo.

## Navegación y conservación — criterios 21–26

- Publicar desde listado y perfil navega al feed y hace visible la tarjeta nueva.
- Publicar en el feed tras desplazar su main lo restaura a `scrollTop = 0`.
- Publicar desde listado en móvil devuelve al feed con `window.scrollY = 0`.
- Navegar por listado, perfil, alta de niño y vinculación de familiar mantiene las publicaciones.
- Una segunda pestaña muestra únicamente las tres publicaciones originales.
- Recargar restaura esas tres tarjetas.
- Los datos originales se trasladaron sin cambiar sus valores; mantienen categorías, contadores y placeholder de témperas.
- Editar y comentarios permanecen deshabilitados; reacciones conservan su representación estática.

## Modal y teclado — criterios 27–31

- Cancelar, Escape y clic fuera cierran y descartan el texto; reabrir restaura los valores iniciales.
- Cancelar desde el feed restaura el foco al compositor.
- Cancelar tras abrir desde el menú móvil restaura el foco a la hamburguesa.
- Tab desde el textarea vuelve a Cancelar; Shift+Tab desde Cancelar vuelve al textarea.
- Espacio cambia un checkbox y ArrowRight cambia el radio de Actividad a Logro.
- El estilo de foco del radio se comprobó en el span asociado.
- El diálogo nativo bloquea la interacción del fondo.
- Documento y main tienen overflow bloqueado durante el modal y restaurado tras cerrarlo.

## Diseño — criterios 32–35 y 43

- Se inspeccionaron las capturas de aplicación y referencia con visión.
- Referencia y aplicación se capturaron a 1440 × 900 y 375 × 812, con zoom por defecto, scroll inicial cero y después de `document.fonts.ready`.
- Escritorio: tarjeta de 580 px, top de 40 px, tipografía, cabecera, botones, textarea, miniaturas, bordes y paleta acordes a la referencia.
- Diferencias acordadas: fondo modal, ocho destinatarios, descripción vacía y solo Actividad seleccionada inicialmente.
- Móvil: márgenes y cabecera adaptados; el contenido puede desplazarse para alcanzar las fotos y volver a Publicar.
- Ancho interior del diálogo 331 px y scrollWidth 331 px en viewport de 375 px; sin desbordamiento horizontal.
- Se probó publicar con los ocho destinatarios y una palabra de 2000 caracteres: la tarjeta mantiene ancho interior y scrollWidth de 331 px.
- A 767 y 768 px se abrió el formulario y se cambió al otro lado del breakpoint antes de cerrarlo; sin bloqueos de scroll residuales.
- Preferencia oscura: fondo del diálogo `rgb(251, 244, 236)`, manteniendo tema claro.

### Capturas

- `spec-06-reference-desktop.png` y `spec-06-desktop.png`.
- `spec-06-reference-mobile.png` y `spec-06-mobile.png`.
- `spec-06-mobile-errors.png` y `spec-06-mobile-bottom.png`.
- `spec-06-desktop-dark.png`.
- `spec-06-feed-original.png`, `spec-06-published.png` y `spec-06-mobile-long-post.png`.

## Privacidad y regresión — criterios 36–38

- Publicación de los siete tipos bajo observación de solicitudes: cero escrituras y ningún texto centinela enviado en URL o cuerpo.
- localStorage, sessionStorage y cookies permanecieron iguales antes y después.
- No hay selección de archivos ni envío de contenido; el formulario intercepta submit.
- Se añadió realmente un niño temporal y se comprobó que no aparece en los destinatarios.
- Se vinculó un familiar en Mateo y apareció pendiente sin alterar las publicaciones.
- Login conserva validación nativa de contraseña obligatoria y navegación al feed tras completar datos ficticios.
- Activación conserva código inicial y permite navegar al feed con consentimiento desmarcado.
- Consola: cero errores y cero advertencias, con dos mensajes informativos del navegador sobre campos de autenticación. Véase `spec-06-console.txt`.

## Comandos — criterios 39–42

| Comando | Resultado |
| --- | --- |
| `npm run build` | Correcto; ocho perfiles originales prerenderizados y configuración de caché conservada. |
| `npx next typegen` | Correcto. |
| `npx tsc --noEmit` | Correcto, tras typegen. |
| `npx eslint app` | Correcto, sin errores ni advertencias. |
| `npm run lint` | Fallos previos: dos errores y ocho advertencias en `references/pantallas/support.js`; una advertencia adicional preexistente en `.playwright-mcp/spec-05-verifier-functional.js`. |
| `git diff --check` | Sin errores de espacios; avisos de conversión LF/CRLF. |

## Documentación consultada

- Guía local `node_modules/next/dist/docs/01-app/01-getting-started/05-server-and-client-components.md`, sección Context providers.
- Guía local `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/use-router.md`.
- Context7 `/vercel/next.js`: proveedor cliente dentro de layout servidor y navegación mediante `next/navigation`.
- Context7 `/reactjs/react.dev`: checkbox/radio controlados, textarea y prevención del envío nativo.

No se añadieron dependencias ni se modificaron las referencias.
