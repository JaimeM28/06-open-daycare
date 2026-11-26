# Verificación de SPEC 05

Fecha: 2026-11-26.
Rama: `spec-05-link-parent`.
Aplicación: build de producción en `http://localhost:3105`.
Referencia: `http://127.0.0.1:3106/vincular-padre.dc.html`.

## Resultado funcional

- Los ocho perfiles originales abren el diálogo sin cambiar la URL.
- Nombre y email comienzan vacíos; Mamá comienza seleccionado.
- Mamá, Papá y Tutor/a se presentan como radios nativos de selección única.
- Campos vacíos, nombre con solo espacios y email mal formado impiden enviar.
- Los errores utilizan `aria-invalid` y `aria-describedby`; el foco pasa al primer campo inválido.
- Enter añade un único familiar con nombre recortado y estado pendiente.
- El botón añade un familiar a Valentina, inicialmente sin padres, y el disparador pasa a «Vincular otro padre».
- Se probó `PRUEBA@example.com` con espacios exteriores; `prueba@EXAMPLE.COM` fue rechazado después en el mismo niño.
- El mismo email se admitió en Sofía y los textos del modal se adaptaron a ella.
- Los familiares originales permanecieron visibles y sin cambios.
- La navegación perfil → listado → otro perfil → feed → listado → perfil conserva las invitaciones.
- La prueba espera la URL de destino tras cada navegación para no comprobar contenido retenido por la navegación parcial.
- Recargar elimina las invitaciones nuevas y conserva los familiares originales.
- Una segunda pestaña no recibe las invitaciones en memoria de la primera.
- X, Escape y clic fuera cierran y descartan; reabrir restablece el formulario.
- Tab desde enviar vuelve al botón de cierre; Shift+Tab desde cierre vuelve a enviar.
- El foco vuelve al disparador al cerrar y se restaura el overflow del fondo.
- Durante el diálogo, página, body y main tienen el desplazamiento bloqueado.
- Se creó un niño temporal con el flujo existente y su botón de vinculación permaneció deshabilitado.
- Activación conserva código `7K4P9`, email original y ausencia de sidebar; no se modificó su implementación.

## Privacidad y consola

- No se observaron solicitudes de escritura durante el envío y la navegación comprobados.
- localStorage, sessionStorage y cookies no cambiaron al enviar la invitación.
- Revisión del código: el formulario intercepta el envío y no incluye solicitudes de red ni escrituras de almacenamiento.
- Consola: cero errores y cero advertencias; véase `spec-05-console.txt`.

## Comparación visual

- `spec-05-reference-desktop.png`: referencia a 1440 × 900.
- `spec-05-desktop.png`: modal a 1440 × 900.
- `spec-05-reference-mobile.png`: referencia a 375 × 812.
- `spec-05-mobile.png`: modal a 375 × 812.
- `spec-05-mobile-errors.png`: errores y contenido desplazable en móvil.
- `spec-05-desktop-dark-preference.png`: el diálogo mantiene fondo claro con preferencia oscura.
- Se esperó `document.fonts.ready` antes de las capturas de comparación, con scroll inicial cero.
- Escritorio: tarjeta de 480 px de ancho, posición superior de 40 px, campos, tipografías, parentescos y código alineados con la referencia.
- Diferencias previstas: superposición sobre el perfil, foco visible y nota de demostración antes del botón.
- Móvil: ancho de página de 375 px y ancho interior del diálogo de 341 px, sin desbordamiento horizontal.
- Cuando los errores alargan el contenido, el diálogo se desplaza y el botón de envío permanece accesible.

## Comprobaciones estáticas

- `npm run build`: correcto, conservando ocho perfiles originales prerenderizados.
- `npx next typegen`: correcto.
- `npx tsc --noEmit`: correcto.
- `npx eslint app`: correcto.
- `npm run lint`: dos errores previos y ocho advertencias exclusivamente en `references/pantallas/support.js`.
- `git diff --check`: sin errores de espacios; solo avisos de conversión LF/CRLF.

No se realizaron commits ni se cambió el estado Aprobado de la spec.
