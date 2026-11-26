# SPEC 01 — Home visual del feed

> **Estado:** Implementado
> **Dependencias:** Ninguna
> **Fecha:** 2026-11-25
> **Objetivo:** Reproducir en `/` el diseño de `references/pantallas/feed.dc.html` mediante componentes reutilizables y Tailwind CSS, con contenido estático y adaptación móvil.

## Alcance

**Incluye:**

- Reemplazar el starter de la ruta `/` por el feed público de OpenDayCare.
- Reproducir la barra lateral con marca, navegación, botón de publicación y perfil de Caro.
- Reproducir el encabezado, el acceso visual para compartir y las tres publicaciones originales.
- Mantener exactamente los textos, nombres, fecha, horarios, contadores y orden del HTML.
- Mantener el placeholder de foto original, sin sustituirlo por una imagen.
- Reproducir colores, tipografías Fredoka y Nunito, iconos SVG, dimensiones, bordes y sombras.
- Usar clases Tailwind para los estilos de los componentes y su adaptación móvil.
- Conservar los controles como elementos únicamente visuales, sin navegación, avisos ni modificación de datos.
- Mantener visible el perfil y el icono de cierre de sesión como contenido de ejemplo, sin una sesión real.

**Fuera de alcance:**

- Autenticación, base de datos, API y persistencia.
- Crear o editar publicaciones, reacciones y comentarios funcionales.
- Otras rutas, fotografías reales, carga de archivos y modo oscuro.
- Importar o modificar el runtime `references/pantallas/support.js`.

## Datos

Esta funcionalidad no introduce modelos persistentes.
Los datos de ejemplo se definen localmente en `app/page.tsx`.
Las tarjetas reciben sus datos mediante propiedades tipadas en `post-card.tsx`.
Los campos necesarios son identificador, tipo, nombre, hora, destinatario, texto, número de reacciones, número de comentarios y presencia del placeholder de foto.
Los tipos de publicación son `achievement`, `activity` y `announcement`.
La fecha y los contadores permanecen fijos al recargar.
No se realizan solicitudes de red para obtener contenido.

## Organización de archivos

- `app/page.tsx`: contenido estático y composición de la home.
- `app/layout.tsx`: Fredoka y Nunito mediante `next/font`, idioma español y metadatos de OpenDayCare.
- `app/globals.css`: importación de Tailwind, configuración de fuentes y colores, y estilos globales mínimos.
- `app/components/feed/sidebar.tsx`: marca, navegación y perfil.
- `app/components/feed/feed-header.tsx`: encabezado y fecha fija.
- `app/components/feed/post-composer.tsx`: acceso visual para compartir un momento.
- `app/components/feed/post-card.tsx`: tarjeta reutilizable para las tres publicaciones.
- `app/components/feed/feed-icons.tsx`: SVG reutilizados de la referencia.

No se crea un archivo CSS Module.
No se fragmentan detalles triviales en componentes adicionales.
Los nombres del código se escriben en inglés.
Los comentarios, únicamente si aportan valor, se escriben en español.
No se modifica `references/`.

## Comportamiento visual

### Escritorio: desde 768 px

- Barra lateral de 248 px, con altura de viewport y sin desplazarse junto al feed.
- Feed con desplazamiento vertical independiente.
- Contenedor central de ancho máximo de 760 px.
- Padding del contenedor de 34 px arriba, 40 px a los lados y 80 px abajo.
- Mantener las dimensiones, sombras y separación del HTML de referencia.
- Mantener el fondo claro incluso cuando el sistema prefiera modo oscuro.

### Móvil: por debajo de 768 px

- Convertir la barra lateral en un bloque superior.
- Distribuir la navegación en filas para que quepa sin desplazamiento horizontal.
- Presentar el feed a todo el ancho disponible con padding reducido.
- Permitir que los encabezados de tarjetas se ajusten a varias líneas.
- Conservar todo el contenido y los controles visuales.
- Usar desplazamiento vertical de la página, sin alturas fijas que corten contenido.
- No añadir menús desplegables ni estado de interacción.

## Plan de implementación

1. Consultar las guías relevantes incluidas en `node_modules/next/dist/docs/` y la documentación actual antes de usar las APIs del framework.
2. Actualizar `app/layout.tsx` y `app/globals.css` con fuentes, idioma, metadatos y tema claro de OpenDayCare, manteniendo la aplicación ejecutable.
3. Crear los iconos, la barra lateral y el encabezado, e integrarlos en `app/page.tsx` con la estructura de escritorio.
4. Crear e integrar `post-composer.tsx` conservando su apariencia sin comportamiento funcional.
5. Crear `post-card.tsx` e incorporar las tres publicaciones con contenido estático y su estructura compartida.
6. Completar las variantes responsive con Tailwind para la barra superior, navegación y tarjetas en móvil.

Cada paso deja la aplicación ejecutable.
No se crean commits automáticamente.

## Criterios de aceptación

- [x] `/` muestra el feed sin autenticación.
- [x] No queda contenido visible del starter de Next.js.
- [x] Las tres publicaciones conservan el contenido y el orden originales.
- [x] El placeholder de foto coincide con la referencia y no carga una fotografía.
- [x] Fredoka y Nunito están cargadas y se aplican a los mismos elementos que en el HTML original.
- [x] A 1440 × 900, la barra lateral mide 248 px y el contenedor del feed respeta su ancho máximo de 760 px.
- [x] En escritorio coinciden los colores, iconos, tamaños, espaciados, bordes y sombras de la referencia.
- [x] El feed se desplaza en escritorio sin desplazar la barra lateral.
- [x] Los controles pendientes no navegan, muestran avisos ni modifican datos.
- [x] Los controles sin implementación no se presentan como enlaces a rutas inexistentes.
- [x] A 375 × 812 no existe desbordamiento horizontal ni contenido cortado.
- [x] En móvil siguen visibles las tres publicaciones y los elementos de navegación.
- [x] La preferencia de modo oscuro no altera el diseño.
- [x] Recargar mantiene la misma fecha, textos y contadores.
- [x] No aparecen errores de ejecución ni hidratación en el navegador.
- [x] `npm run build` finaliza correctamente.
- [x] `npx next typegen` seguido de `npx tsc --noEmit` finaliza correctamente.
- [x] ESLint no informa errores en los archivos de aplicación modificados.
- [x] Se ejecuta `npm run lint` y se distinguen posibles problemas previos de `references/` de los introducidos por la implementación.
- [x] Se compara visualmente el HTML original y `/` con el mismo viewport y las fuentes cargadas.
- [x] Las capturas y demás artefactos de Playwright se guardan en `.playwright-mcp/`.

## Decisiones

- **Sí:** componentes para bloques visuales independientes y una tarjeta reutilizable para evitar duplicación.
- **No:** concentrar toda la interfaz en `app/page.tsx`, para mantener legible la composición.
- **Sí:** clases Tailwind en cada componente, incluida la adaptación móvil, por petición del usuario.
- **No:** CSS Modules ni estilos inline como estrategia principal.
- **Sí:** conservar los SVG originales para minimizar diferencias visuales.
- **No:** añadir una biblioteca de iconos.
- **Sí:** datos estáticos idénticos para priorizar fidelidad visual sin backend.
- **No:** localStorage, estado de reacciones o funcionalidades simuladas.
- **Sí:** fuentes mediante `next/font`, sustituyendo Geist por Fredoka y Nunito.
- **Sí:** adaptar móvil sin alterar el diseño de escritorio.
- **No:** cargar el runtime de la plantilla; la interfaz se construye con componentes propios.

## Riesgos

- La descarga de fuentes durante el build requiere conectividad; no se considera validada la fidelidad tipográfica hasta comprobar su carga.
- Tailwind puede aplicar estilos base diferentes a los del HTML; se verifican explícitamente tipografía, alturas de línea, márgenes y controles.
- La referencia no incluye variante móvil; la adaptación se evalúa por conservación del contenido y ausencia de desbordamientos, no por igualdad con una captura móvil inexistente.

## Qué no incluye esta especificación

- Pantallas adicionales.
- Lógica de negocio.
- Autenticación, backend o persistencia.
- Interacciones funcionales de publicaciones, navegación o sesión.
