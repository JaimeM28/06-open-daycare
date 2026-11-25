# SPEC 02 — Listado y perfil de niños

> **Estado:** Aprobado
> **Dependencias:** SPEC 01
> **Fecha:** 2026-11-25
> **Objetivo:** Implementar el listado de niños y sus perfiles con datos ficticios, búsqueda local y navegación desde el sidebar, respetando las referencias visuales.

## Alcance

**Incluye:**

- `/ninos`: listado basado en `references/pantallas/ninos.dc.html`.
- `/niño/[id]`: perfil basado en `references/pantallas/perfil-nino.dc.html`.
- Ocho niños, en el orden y con los datos visibles del listado original.
- Perfil de Mateo idéntico a la referencia.
- Perfiles completos con datos ficticios para los otros siete.
- Buscador local por nombre y apellido.
- Navegación funcional entre Feed, Niños y perfiles.
- Estilos con Tailwind y adaptación móvil.

**Fuera de alcance:**

- Backend, autenticación y persistencia.
- Agregar o editar niños, vincular padres y generar resúmenes.
- Funcionalidad de Avisos, Mi cuenta y cierre de sesión.

Los controles fuera de alcance conservan su aspecto, sin navegar ni modificar datos.
No se modifica `references/` ni se importa su runtime a la aplicación.

## Datos

Una única fuente local en `app/data/children.ts`, con tipos `Child` y `Parent`.

**Child:**

- `id`, `name`, `age`, `initial`, `avatarColor`.
- `birthDate`, `classroom`, `enrollmentDate`.
- `allergyLabel`, `notes`.
- `parents`.

**Parent:**

- `id`, `name`, `initial`, `avatarColor`.
- `relationship`.
- `status`: `active` o `pending`.

IDs estables:

| Niño | ID |
| --- | --- |
| Mateo Fernández | `mateo-fernandez` |
| Sofía Méndez | `sofia-mendez` |
| Benjamín Ruiz | `benjamin-ruiz` |
| Valentina Soto | `valentina-soto` |
| Tomás Díaz | `tomas-diaz` |
| Emma Castro | `emma-castro` |
| Lucas Romero | `lucas-romero` |
| Olivia Vega | `olivia-vega` |

- Se conservan edades, colores, alergias y conteos del listado.
- Mateo mantiene fechas, notas y padres de su referencia.
- Los datos adicionales son ficticios y fijos, sin usar información personal real.
- Los padres pendientes cuentan como vinculados, como ocurre con Diego en la plantilla.
- Valentina muestra un estado sin padres vinculados y el control visual para vincular.
- Las edades son valores de demostración: no cambian según la fecha del sistema.

## Organización de archivos

**Nuevos archivos:**

- `app/data/children.ts`: datos y tipos compartidos.
- `app/ninos/page.tsx`: página del listado.
- `app/niño/[id]/page.tsx`: resolución del perfil.
- `app/components/children/children-directory.tsx`: búsqueda y resultados.
- `app/components/children/child-card.tsx`: tarjeta enlazable.
- `app/components/children/child-profile.tsx`: composición del perfil.
- `app/components/children/linked-parents.tsx`: padres y estado vacío.

**Archivos existentes:**

- `app/components/feed/sidebar.tsx`: hacerlo reutilizable con sección activa `feed` o `children`.
- `app/components/feed/feed-icons.tsx`: incorporar los SVG necesarios.
- `app/page.tsx`: indicar Feed como sección activa.
- `AGENTS.md`: actualizar el contexto de rutas y navegación implementadas.

Solo el buscador necesita estado cliente.
Las páginas y perfiles permanecen como componentes de servidor.
Los componentes importados por el buscador respetan su frontera cliente.

## Navegación y estados

- Feed enlaza a `/`.
- Niños enlaza a `/ninos`.
- Cada tarjeta enlaza al ID correspondiente, por ejemplo `/niño/mateo-fernandez`.
- Se conserva literalmente la `ñ` en el segmento del perfil; su codificación URL equivalente es válida.
- «Volver a Niños» enlaza a `/ninos`.
- Niños aparece activo tanto en el listado como en los perfiles.
- Una URL de perfil puede abrirse directamente y recargarse.
- Un ID inexistente muestra la página 404, nunca el perfil de otro niño.
- La búsqueda ignora mayúsculas, tildes y espacios exteriores.
- El contador refleja los resultados; sin búsqueda muestra «8 niños».
- Sin coincidencias se muestra «No se encontraron niños».
- Limpiar la búsqueda restaura las ocho tarjetas.
- No se conserva la búsqueda tras recargar ni se sincroniza con la URL.

Esta spec sustituye la restricción de navegación inerte de SPEC 01 únicamente para Feed y Niños, sin modificar el resto de sus controles.

## Diseño y móvil

- Escritorio fiel a ambas referencias: sidebar de 248 px, listado de ancho máximo de 880 px y perfil de 820 px.
- Listado de dos columnas en escritorio y una en móvil.
- Se mantiene el breakpoint existente de 768 px entre móvil y escritorio.
- Perfil apilado en móvil, manteniendo todos los bloques.
- Conservar colores, fuentes, SVG, sombras y hover de las tarjetas.
- Mantener la adaptación del sidebar existente.
- Sin desbordamientos horizontales ni textos cortados.
- El perfil de Mateo es la referencia de comparación visual; los demás conservan su estructura.

## Calidad del código

- Nombres de componentes, funciones, tipos y variables en inglés.
- Componentes con responsabilidad única y funciones pequeñas.
- Datos compartidos sin duplicación entre listado y perfil.
- Sin abstracciones innecesarias ni dependencias nuevas.
- Comentarios útiles en español.
- Tailwind para estilos; sin CSS Modules.

## Plan de implementación

1. Consultar documentación local y Context7 sobre rutas dinámicas, enlaces y `cacheComponents`.
2. Crear los datos tipados de los ocho niños.
3. Implementar listado y perfiles, incluyendo resolución de IDs y 404.
4. Activar navegación compartida y sección seleccionada.
5. Incorporar búsqueda local, contador y estado sin resultados.
6. Completar adaptación móvil y actualizar el contexto de `AGENTS.md`.

Cada paso deja la aplicación ejecutable.
No se crean commits automáticamente.

### Precauciones de Next.js

- Generar los ocho parámetros con `generateStaticParams`.
- Resolver `params` de forma asíncrona y usar `notFound()` para IDs desconocidos.
- No utilizar `dynamicParams: false`, incompatible con `cacheComponents`.
- Conservar `cacheComponents` y `partialPrefetching` en `next.config.ts`.
- Validar el comportamiento con las guías incluidas en la versión instalada antes de escribir código.

La documentación consultada mediante Context7 corresponde a Next.js 16.4.5, la versión disponible más cercana a la instalada 16.4.6.

## Criterios de aceptación

- [ ] `/ninos` muestra los ocho niños originales en su orden.
- [ ] Textos, edades, colores, etiquetas y conteos coinciden con el listado de referencia.
- [ ] Cada tarjeta abre el perfil de su propio ID.
- [ ] Los ocho perfiles funcionan por navegación, acceso directo y recarga.
- [ ] Mateo reproduce los datos completos de su referencia.
- [ ] Los demás perfiles contienen datos ficticios coherentes con sus tarjetas.
- [ ] Valentina muestra el estado sin padres vinculados.
- [ ] Un ID desconocido muestra 404 sin datos de otro niño.
- [ ] Feed, Niños y «Volver a Niños» navegan correctamente.
- [ ] El sidebar identifica la sección activa en las tres vistas.
- [ ] Buscar `SOFIA` encuentra a Sofía Méndez.
- [ ] Buscar por apellido filtra correctamente.
- [ ] El contador refleja los resultados y limpiar restaura los ocho niños.
- [ ] Una búsqueda sin coincidencias muestra el estado vacío.
- [ ] Las acciones fuera de alcance permanecen inertes.
- [ ] La home conserva su diseño y contenido anteriores.
- [ ] A 1440 × 900, listado y perfil de Mateo coinciden visualmente con sus referencias.
- [ ] A 375 × 812, ambas pantallas conservan el contenido sin desbordamientos.
- [ ] No aparecen errores de consola ni hidratación.
- [ ] Build, generación de tipos, TypeScript y ESLint de `app/` finalizan correctamente.
- [ ] Se ejecuta lint global distinguiendo los errores previos del runtime generado.
- [ ] Las evidencias visuales se guardan en `.playwright-mcp/`.

## Decisiones

- **Sí:** datos locales ficticios para permitir perfiles completos sin backend.
- **Sí:** conservar Mateo exactamente como referencia visual y mantener los demás perfiles coherentes con el listado.
- **Sí:** usar `/ninos` y `/niño/[id]`, según las rutas elegidas por el usuario.
- **Sí:** filtro local sin persistencia ni sincronización con la URL.
- **Sí:** reutilizar sidebar, fuentes, paleta e iconos existentes para evitar divergencias entre pantallas.
- **Sí:** actualizar el estado activo mediante propiedades del sidebar sin convertirlo por completo en componente cliente.
- **No:** activar acciones de gestión que pertenecen a futuras especificaciones.
- **No:** modificar los criterios ni el archivo de SPEC 01 para introducir la nueva navegación; la excepción queda documentada en esta spec.

## Riesgos

- El segmento con `ñ` se representa codificado en algunas herramientas: verificar navegación y acceso directo con su URL equivalente.
- Las restricciones de `cacheComponents` pueden afectar rutas dinámicas e IDs desconocidos: comprobarlas en build y en ejecución.
- El perfil original tiene anchos mínimos que no caben en móvil: adaptar esos bloques sin alterar su diseño de escritorio.
- El runtime generado de referencias mantiene errores previos de lint: distinguirlos de los cambios de aplicación sin editar el runtime.

## Qué no incluye esta especificación

- Backend, autenticación o persistencia.
- Gestión funcional de niños y padres.
- Resumen del día.
- Pantallas adicionales de Avisos, Mi cuenta o sesión.
