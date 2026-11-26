# SPEC 03 — Login y activación de cuenta

> **Estado:** Aprobado
> **Dependencias:** SPEC 01, SPEC 02
> **Fecha:** 2026-11-26
> **Objetivo:** Implementar login y activación como formularios de demostración navegables, respetando las referencias visuales y sin autenticación real.

## Alcance

**Incluye:**

- `/login`, basado en `references/pantallas/login.dc.html`, sin selector «Personal / Familia» ni etiqueta «INGRESO COMO».
- `/activar-cuenta`, basado en `references/pantallas/activar-cuenta.dc.html`.
- Campos editables, validación básica y navegación al feed `/` tras un envío válido.
- Enlaces funcionales entre login y activación.
- Tailwind, fuentes y paleta existentes.
- Adaptación móvil.

**Fuera de alcance:**

- Autenticación, sesiones, backend y persistencia.
- Verificación real de invitaciones o credenciales.
- Recuperación de contraseña: permanece visible, pero inerte.
- Feed familiar, protección de rutas y cierre de sesión.
- Modificaciones de `references/` y uso de su runtime en la aplicación.

## Datos y comportamiento

No se introducen modelos persistentes.
Los valores iniciales se definen en los formularios como datos ficticios de demostración.

### Login

- Email inicial: `caro@opendaycare.com`.
- Contraseña inicialmente vacía.
- Ambos campos obligatorios; email con formato válido.
- No se exige longitud mínima de contraseña en esta demo.

### Activación

- Tarjeta fija: Mateo · Sala Soles.
- Código inicial: `7K4P9`.
- Email inicial: `lucia.fernandez@gmail.com`.
- Código y email editables; contraseña inicialmente vacía.
- Los tres campos son obligatorios; email con formato válido.
- Consentimiento de fotos marcado inicialmente y modificable.
- El consentimiento es opcional: desmarcarlo no bloquea el envío.

### Comportamiento compartido

- Validación nativa del navegador.
- Enviar mediante botón o Enter tiene el mismo resultado.
- Un envío válido navega a `/`, sin transmitir ni guardar los valores del formulario.
- No se incluyen credenciales en la URL, logs ni almacenamiento.
- Recargar restaura los valores iniciales.
- El feed y las rutas existentes siguen siendo públicos.
- No se muestra un estado de autenticación ni se afirma que se haya creado una cuenta real.

## Organización de archivos

**Nuevos archivos:**

- `app/login/page.tsx`: composición del login.
- `app/activar-cuenta/page.tsx`: composición de activación.
- `app/components/auth/login-form.tsx`: formulario de login.
- `app/components/auth/activation-form.tsx`: formulario de activación.
- `app/components/auth/auth-field.tsx`: campo reutilizable con etiqueta.
- `app/components/auth/auth-brand.tsx`: marca y símbolo compartidos.

**Archivo existente:**

- `AGENTS.md`: documentar las nuevas rutas y su carácter demostrativo.

Reutilizar fuentes, colores e iconos existentes cuando encajen.
No añadir dependencias ni fragmentar detalles triviales en componentes.
Las páginas componen la interfaz y los formularios delimitan el comportamiento cliente necesario para interceptar el envío.
Los nombres del código se escriben en inglés.
Los comentarios, únicamente si aportan valor, se escriben en español.

## Diseño y accesibilidad

- Escritorio desde 768 px: conservar distribución, tamaños, colores, SVG, sombras y espaciados de las referencias, salvo la eliminación del selector.
- Login móvil: cabecera coral compacta con marca y formulario debajo; ocultar texto promocional y pie del panel.
- Activación móvil: conservar todo el contenido con padding reducido.
- Sin sidebar en ambas pantallas.
- Desplazamiento vertical de página, sin contenido cortado ni desbordamiento horizontal.
- Etiquetas asociadas a inputs, checkbox real y foco visible.
- Contraseñas ocultas y sin valores precargados.
- Mantener el tema claro aunque el sistema prefiera modo oscuro.

## Plan de implementación

1. Consultar las guías relevantes de `node_modules/next/dist/docs/` y Context7 para las APIs de Next.js que se utilicen, conservando la configuración existente de caché y prefetch.
2. Crear los elementos compartidos de marca y campos.
3. Implementar `/login` con formulario validado y navegación al feed.
4. Implementar `/activar-cuenta`, consentimiento opcional y enlaces entre pantallas.
5. Completar adaptación móvil, accesibilidad y actualizar `AGENTS.md`.

Cada paso deja la aplicación ejecutable.
No se crean commits automáticamente.

## Criterios de aceptación

- [ ] Ambas rutas funcionan por acceso directo y recarga.
- [ ] El login no muestra selector de rol ni «INGRESO COMO».
- [ ] Los campos comienzan con los valores acordados.
- [ ] Ambos formularios permiten editar sus campos.
- [ ] Campos obligatorios vacíos o emails inválidos impiden navegar.
- [ ] Un envío válido mediante botón o Enter navega a `/`.
- [ ] Desmarcar el consentimiento no bloquea la activación.
- [ ] Los enlaces entre login y activación funcionan.
- [ ] Recuperación de contraseña permanece visible e inerte, sin enlazar a una ruta inexistente.
- [ ] No se transmiten ni persisten credenciales o consentimiento.
- [ ] Recargar restaura los valores iniciales.
- [ ] El feed, listado y perfiles conservan su comportamiento público y su diseño.
- [ ] A 1440 × 900 se comparan ambas pantallas con sus referencias, considerando las diferencias acordadas.
- [ ] A 375 × 812 no hay desbordamientos ni contenido cortado.
- [ ] En móvil, el login muestra la cabecera coral compacta sin texto promocional ni pie del panel.
- [ ] Los formularios se utilizan con teclado y muestran foco visible.
- [ ] Las etiquetas están asociadas a sus campos y el consentimiento utiliza un checkbox real.
- [ ] La preferencia de modo oscuro no altera el diseño.
- [ ] No aparecen errores de ejecución ni hidratación.
- [ ] `npm run build` finaliza correctamente.
- [ ] `npx next typegen` seguido de `npx tsc --noEmit` finaliza correctamente.
- [ ] `npx eslint app` finaliza sin errores.
- [ ] Se ejecuta `npm run lint` y se distinguen los errores previos del runtime generado en `references/` de las regresiones propias.
- [ ] Las evidencias visuales se guardan en `.playwright-mcp/`, con iguales viewport y scroll y tras esperar `document.fonts.ready`.

## Decisiones

- **Sí:** demo navegable para continuar el enfoque sin backend del proyecto.
- **No:** selector de rol, por decisión expresa del usuario.
- **Sí:** conservar `/` como feed público y añadir `/login` y `/activar-cuenta`.
- **Sí:** conservar los datos de ejemplo y permitir editarlos, sin validar su autenticidad.
- **Sí:** consentimiento opcional e independiente de la activación.
- **No:** simular sesiones o guardar contraseñas.
- **Sí:** validación nativa básica para evitar añadir lógica innecesaria a una demo.
- **No:** imponer políticas de contraseña propias de un sistema de autenticación real.
- **Sí:** adaptar móvil con cabecera compacta sin reproducir las limitaciones del HTML de escritorio.
- **Sí:** mantener recuperación visible pero inerte, sin añadir otro flujo.
- **No:** modificar las specs anteriores; esta spec incorpora las nuevas pantallas sin cambiar el acceso público existente.

## Riesgos

- Los formularios pueden confundirse con autenticación real: no se crean sesiones, no se protegen rutas y no se guardan credenciales.
- El consentimiento solo es un control de demostración; no constituye un registro de autorización ni modifica permisos sobre fotografías.
- La referencia no incluye variante móvil; la adaptación se verifica según las decisiones anteriores y la ausencia de desbordamientos.
- La validación nativa puede mostrar mensajes distintos según navegador e idioma; se verifica el bloqueo del envío, no su texto exacto.
- Si se verifica con `npm run start`, reconstruir y reiniciar el servidor tras cambios para evitar comprobar un build anterior.

## Qué no incluye esta especificación

- Autenticación real, backend, sesiones o persistencia.
- Validación de códigos de invitación o creación real de cuentas.
- Recuperación de contraseña funcional.
- Feed familiar, protección de rutas o cierre de sesión.
- Registro legal o persistente del consentimiento de fotos.
