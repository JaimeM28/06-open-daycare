# SPEC 06 — Creación temporal de publicaciones

> **Estado:** Aprobado
> **Dependencias:** SPEC 01, SPEC 04
> **Fecha:** 2026-11-26
> **Objetivo:** Crear publicaciones en memoria mediante un modal con destinatarios y tipo seleccionables, incorporándolas al principio del feed sin backend ni carga de fotos.

## Alcance

**Incluye:**

- Modal basado en `references/pantallas/crear-publicacion.dc.html`.
- Activar «Nueva publicación» en el menú de escritorio y móvil.
- Activar «Compartí un momento…» en el feed.
- Seleccionar uno o varios de los ocho niños originales, o toda la sala.
- Seleccionar un único tipo entre Comida, Siesta, Actividad, Logro, Ánimo, Foto y Anuncio.
- Crear una tarjeta por envío válido y conservarla durante la navegación.
- Navegar al feed tras publicar desde otras pantallas.
- Validación, accesibilidad y adaptación móvil.
- Conservar la sección de fotos como contenido ilustrativo.

**Fuera de alcance:**

- Backend, API, autenticación y almacenamiento persistente.
- Subida de archivos, selección de imágenes y fotografías reales.
- Destinatarios correspondientes a niños temporales de la SPEC 04.
- Edición o eliminación de publicaciones, reacciones y comentarios funcionales.
- Notificaciones, entrega real a familias y filtrado de acceso por destinatario.
- Borradores, confirmación de descarte y atajos de teclado para publicar.
- Modificaciones de `references/` o importación de su runtime.

## Datos y comportamiento

### Fuentes y tipos

- `app/data/children.ts` conserva los ocho niños originales y aporta sus IDs, nombres, iniciales y colores.
- `app/data/posts.ts` concentra las tres publicaciones originales y los tipos y categorías compartidos.
- Las publicaciones originales conservan texto, horarios, contadores, orden y apariencia.
- `FeedPost` conserva sus campos actuales: `id`, `type`, `name`, `time`, `recipient`, `text`, `reactionCount`, `commentCount` y `hasPhoto`.
- Ampliar los tipos disponibles sin alterar los valores de los ejemplos originales.

```ts
type PostType = "food" | "nap" | "activity" | "achievement" | "mood" | "photo" | "announcement";

type PostFormValues = {
  recipientIds: string[];
  isClassroom: boolean;
  type: PostType;
  text: string;
};
```

Las etiquetas visibles son Comida, Siesta, Actividad, Logro, Ánimo, Foto y Anuncio, respectivamente.

### Estado compartido

- `PostsProvider` se monta en el layout compartido sin convertir todo el layout en cliente.
- Mantiene publicaciones nuevas y apertura del formulario en memoria.
- No mutar los datos de las publicaciones originales.
- Las publicaciones nuevas se anteponen a las originales, con la más reciente primero.
- Navegar entre feed, listado y perfiles conserva las publicaciones nuevas.
- Recargar o abrir otra pestaña restaura únicamente las tres publicaciones originales.
- No utilizar cookies, localStorage, sessionStorage ni solicitudes de escritura.

### Transformación al publicar

- Crear un ID único por envío.
- Recortar los espacios exteriores de la descripción y conservar sus saltos de línea.
- No imponer un límite artificial de caracteres.
- Derivar los nombres de destinatarios de los IDs seleccionados.
- Una selección múltiple genera una sola tarjeta con los nombres de los destinatarios.
- La alternativa general muestra «Toda la sala» y destinatario «toda la sala».
- La tarjeta muestra el tipo elegido y la hora local de creación en formato `HH:mm`.
- Reutilizar «publicado por vos» como autoría demostrativa.
- Las publicaciones nuevas comienzan con cero reacciones y cero comentarios.
- En publicaciones nuevas, `hasPhoto` solo es verdadero para el tipo Foto.
- Su foto es un placeholder genérico, no una imagen adjunta ni el texto específico de témperas de la publicación original.
- El tipo Foto no exige un archivo porque la carga de fotos queda fuera de alcance.

## Formulario y validación

### Valores iniciales

- Mateo seleccionado como único destinatario.
- «Toda la sala» sin seleccionar.
- Tipo Actividad seleccionado.
- Descripción vacía, con el placeholder de la referencia.
- Miniatura ilustrativa y control «Agregar» deshabilitado.

### Destinatarios

- Mostrar los ocho niños originales con sus avatares, además de «Toda la sala».
- Los chips permiten seleccionar y deseleccionar varios niños.
- «Toda la sala» es excluyente con la selección individual.
- Seleccionar «Toda la sala» limpia la selección individual.
- Seleccionar un niño desactiva «Toda la sala».
- Permitir deseleccionar para que el formulario pueda quedar sin destinatarios.
- Exigir al menos un niño o la alternativa de sala completa al publicar.
- No incorporar automáticamente las altas temporales.

### Tipo y descripción

- Selección única entre los siete tipos.
- Distinguir visualmente el único tipo seleccionado.
- Reutilizar los colores de cada categoría de la referencia.
- Descripción obligatoria y distinta de espacios.
- Enter dentro de la descripción inserta un salto de línea.
- La publicación se ejecuta desde «Publicar», mediante ratón o activación normal con teclado.
- No añadir atajos de publicación.

### Errores y envío

- Validar al intentar publicar.
- Mostrar errores junto al grupo de destinatarios o la descripción.
- Asociar errores accesiblemente y enfocar el primer control inválido.
- Un envío inválido mantiene abierto el modal y conserva los valores.
- Un envío válido crea exactamente una publicación y cierra el modal.
- Desde listado o perfiles, navegar después a `/`.
- Desde el feed, conservar `/` y desplazar su contenedor principal al inicio.
- La publicación nueva queda visible al principio del feed.

## Modal, diseño y accesibilidad

- Abrir sobre la pantalla actual sin cambiar su URL.
- Reutilizar `app/components/ui/modal-dialog.tsx`.
- Conservar la tarjeta de ancho máximo de 580 px, cabecera, fuentes, paleta y espaciados de la referencia.
- Añadir la superposición y el comportamiento modal existentes.
- Ajustar la distribución de chips para mostrar ocho niños y permitir saltos de línea.
- Mantener la sección de fotos ilustrativa para todos los tipos, sin adjuntar contenido a la publicación.
- El placeholder del formulario no implica que exista una foto seleccionada.
- «Agregar» permanece deshabilitado y no abre selector de archivos ni navega.
- No añadir el aviso opcional de fotos no disponibles.
- Cancelar, Escape y clic fuera cierran y descartan sin confirmación.
- Reabrir restaura los valores iniciales.
- Mantener el foco dentro del diálogo y bloquear interacción y desplazamiento del fondo.
- Al cancelar, devolver el foco al disparador disponible.
- Desde el menú móvil, cerrar primero el panel y después abrir el formulario, sin diálogos superpuestos.
- Tras cancelar ese flujo, devolver el foco a la hamburguesa porque el disparador del panel ya no está visible.
- Asociar etiquetas a campos y comunicar selección en destinatarios y tipos.
- Mostrar foco visible y permitir usar todos los controles con teclado.
- En móvil, reducir márgenes y permitir scroll del modal si no cabe.
- Evitar desbordamiento horizontal y mantener el tema claro.

## Organización de archivos

**Nuevos archivos:**

- `app/data/posts.ts`: publicaciones originales, tipos y categorías compartidos.
- `app/lib/post-form.ts`: valores, validación y transformación de publicaciones.
- `app/components/feed/posts-provider.tsx`: publicaciones en memoria y apertura compartida del modal.
- `app/components/feed/post-form.tsx`: destinatarios, tipos, descripción, fotos ilustrativas y envío.
- `app/components/feed/create-post-modal.tsx`: composición del diálogo.

**Archivos existentes:**

- `app/layout.tsx`: montar el proveedor conservando los proveedores existentes.
- `app/page.tsx`: sustituir los datos locales por la integración del feed compartido.
- `app/components/feed/post-card.tsx`: admitir las siete categorías y destinatarios múltiples sin alterar las tarjetas originales.
- `app/components/feed/post-composer.tsx`: activar el disparador del feed.
- `app/components/feed/sidebar.tsx`: activar «Nueva publicación» en ambos menús.
- `app/components/feed/mobile-navigation.tsx`: coordinar el cierre del panel antes de abrir el formulario.
- `AGENTS.md`: documentar el flujo, fuentes y límites demostrativos.

Reutilizar componentes e iconos existentes.
No añadir dependencias ni duplicar categorías entre formulario y tarjetas.
Los nombres de código se escriben en inglés.
Los comentarios, solo cuando aporten valor, se escriben en español.

## Plan de implementación

1. Consultar las guías locales de Next.js y Context7 sobre proveedores cliente, navegación y formularios.
2. Extraer publicaciones y categorías a `app/data/posts.ts`, manteniendo las tres tarjetas originales.
3. Incorporar tipos del formulario, validación y transformación a `app/lib/post-form.ts`.
4. Añadir `PostsProvider` e integrar el estado compartido en layout y feed.
5. Ampliar las tarjetas para las siete categorías, múltiples destinatarios y placeholder genérico del tipo Foto.
6. Incorporar selección de destinatarios al formulario con Mateo como valor inicial.
7. Completar tipos, descripción, validación y sección de fotos ilustrativa.
8. Componer el modal y conectar «Compartí un momento…», incluyendo publicación y navegación al feed.
9. Activar «Nueva publicación» en escritorio y coordinar el cierre previo del menú móvil.
10. Completar adaptación responsive, gestión del foco y documentación en `AGENTS.md`.

Cada paso deja la aplicación ejecutable.
No realizar commits automáticos.
Conservar `cacheComponents` y `partialPrefetching`.

## Criterios de aceptación

- [x] «Compartí un momento…» y «Nueva publicación» abren el mismo formulario sin cambiar la URL.
- [x] «Nueva publicación» funciona desde feed, listado y perfiles.
- [x] En móvil, el menú se cierra antes de abrir el formulario y no quedan dos diálogos abiertos.
- [x] El formulario muestra los ocho niños originales y «Toda la sala», sin niños temporales.
- [x] Inicialmente están seleccionados Mateo y Actividad, con descripción vacía.
- [x] Se pueden seleccionar varios niños y deseleccionarlos.
- [x] «Toda la sala» y los destinatarios individuales son alternativas excluyentes.
- [x] Sin destinatarios no se puede publicar y se muestra un error accesible junto al grupo.
- [x] Los siete tipos son seleccionables y solo uno queda seleccionado.
- [x] Una descripción vacía o compuesta solo por espacios impide publicar.
- [x] Un envío inválido conserva valores y enfoca el primer control inválido.
- [x] Enter dentro de la descripción inserta una línea y no publica.
- [x] Cada envío válido crea exactamente una tarjeta al principio del feed.
- [x] Seleccionar varios niños genera una sola tarjeta con sus nombres.
- [x] Seleccionar «Toda la sala» genera una sola tarjeta general con ese destinatario.
- [x] La tarjeta nueva muestra tipo, hora local, descripción recortada y contadores a cero.
- [x] Los saltos de línea de la descripción se conservan al mostrarla.
- [x] El tipo Foto permite publicar sin archivo y muestra únicamente un placeholder genérico en su tarjeta.
- [x] Los otros tipos nuevos no muestran placeholder de foto.
- [x] La miniatura del formulario es ilustrativa y «Agregar» no abre archivos ni navega.
- [x] Publicar desde listado o perfil navega a `/` y deja visible la tarjeta nueva.
- [x] Publicar desde `/` muestra la tarjeta nueva y desplaza el main al inicio.
- [x] Navegar entre feed, listado y perfiles conserva las publicaciones nuevas.
- [x] Recargar o abrir otra pestaña restaura las tres publicaciones originales.
- [x] Las tres publicaciones originales conservan contenido, orden relativo, contadores y apariencia.
- [x] Editar, reacciones y comentarios no incorporan comportamiento nuevo.
- [x] Cancelar, Escape y clic fuera descartan el formulario y reabrir restaura sus valores iniciales.
- [x] El foco permanece dentro del modal y vuelve al disparador disponible al cancelar.
- [x] Al cancelar un formulario abierto desde el menú móvil, el foco vuelve a la hamburguesa.
- [x] El fondo no recibe interacción ni se desplaza y sus bloqueos se liberan al cerrar.
- [x] Los controles se utilizan con teclado, tienen nombre accesible y muestran foco visible.
- [x] A 1440 × 900 se compara la tarjeta con la referencia, considerando las diferencias acordadas.
- [x] A 375 × 812 no hay desbordamiento horizontal ni controles inaccesibles y el modal largo se desplaza.
- [x] A 767 y 768 px los accesos, el modal y la navegación funcionan sin bloqueos residuales.
- [x] La preferencia de modo oscuro no altera el tema claro.
- [x] No se transmiten ni persisten destinatarios, descripciones o archivos.
- [x] Alta de niños, vinculación de padres, login y activación conservan su comportamiento.
- [x] No aparecen errores de ejecución ni hidratación.
- [x] `npm run build` finaliza correctamente.
- [x] `npx next typegen` seguido de `npx tsc --noEmit` finaliza correctamente.
- [x] `npx eslint app` finaliza sin errores.
- [x] Se ejecuta el lint global y se distinguen los fallos previos de `references/` de las regresiones propias.
- [x] Las capturas y evidencias se guardan en `.playwright-mcp/`, con iguales viewport y scroll y tras `document.fonts.ready`.

### Evidencia de implementación

- Comprobaciones funcionales, visuales y de regresión: `.playwright-mcp/spec-06-verification.md`.
- Verificación con Playwright sobre el build de producción en `http://localhost:3110`.
- Estado Aprobado conservado para la revisión final del usuario; sin commits automáticos.

## Decisiones

- **Sí:** modal reutilizando la infraestructura existente, para conservar el contexto de creación.
- **Sí:** ambos accesos, incluido el menú móvil, para habilitar los disparadores ya visibles.
- **Sí:** estado en memoria, coherente con las demos actuales y sin persistir contenido de niños.
- **No:** backend, entrega real a familias ni control de acceso por destinatario.
- **Sí:** ocho niños originales y selección múltiple con sala completa excluyente.
- **No:** destinatarios temporales, para limitar esta integración.
- **Sí:** siete tipos con Actividad inicial, evitando la ambigüedad de varios botones oscuros en la referencia.
- **Sí:** Mateo inicial y descripción vacía, para evitar publicar accidentalmente el texto de ejemplo.
- **Sí:** una tarjeta por envío, sin duplicar contenido por destinatario.
- **Sí:** fotos solo ilustrativas y placeholder en tarjetas nuevas exclusivamente para Foto.
- **No:** carga de imágenes ni aviso adicional de fotos no disponibles, por decisión acordada.
- **Sí:** validación al publicar sin límite artificial de texto, conservando saltos de línea.
- **Sí:** cerrar y descartar sin confirmación ni borrador, coherente con los otros formularios.
- **No:** editar, reaccionar o comentar; permanecen fuera de alcance.
- **No:** modificar las specs anteriores; esta sustituye únicamente la restricción de creación inerte y amplía los tipos del feed.

## Riesgos

- El menú móvil y el formulario comparten comportamiento modal; cerrar el primero antes de abrir el segundo evita conflictos de foco y scroll.
- Los destinatarios son metadatos de demostración y no restringen el acceso al feed público.
- Recargar elimina deliberadamente el contenido creado y no constituye almacenamiento real.
- La referencia incluye tres destinatarios y texto precargado; comparar considerando los ocho destinatarios, descripción vacía, selección única y superposición acordados.
- La navegación parcial puede retener contenido anterior momentáneamente; esperar la URL de destino y la tarjeta visible al verificar.
- Los textos largos y listas de destinatarios pueden desbordar tarjetas; comprobar salto de línea y adaptación móvil.

## Qué no incluye esta especificación

- Backend, persistencia, autenticación, notificaciones ni permisos reales.
- Fotografías reales o selección de archivos.
- Destinatarios temporales.
- Edición, eliminación, reacciones y comentarios funcionales.
- Borradores y confirmación de descarte.
