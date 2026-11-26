# SPEC 04 — Alta temporal de niños y navegación móvil

> **Estado:** Implementado
> **Dependencias:** SPEC 01, SPEC 02
> **Fecha:** 2026-11-26
> **Objetivo:** Permitir agregar niños en memoria mediante un modal y sustituir la navegación móvil por un panel lateral con hamburguesa.

## Alcance

**Incluye:**

- Activar «Agregar niño» en `/ninos`.
- Modal basado en `references/pantallas/agregar-nino.dc.html`.
- Guardar niños durante la navegación dentro de la aplicación.
- Integrarlos en listado, búsqueda, contador y perfiles.
- Hamburguesa por debajo de 768 px en feed, listado y perfiles.
- Mantener el sidebar actual en escritorio.

**Fuera de alcance:**

- Backend, autenticación y almacenamiento persistente.
- Edición y eliminación de niños.
- Gestión de salas, vinculación de padres y acciones actualmente inertes.
- Cambios en login y activación.
- Modificar `references/` o importar su runtime.

## Datos

- `app/data/children.ts` conserva los ocho niños originales sin cambios en sus valores.
- Un proveedor cliente mantiene los nuevos niños en memoria, sin mutar el array original.
- El proveedor se monta en el layout compartido para conservar las altas al navegar.
- Recargar o abrir otra pestaña inicia nuevamente con los ocho niños originales.
- No se utilizan cookies, localStorage, sessionStorage ni solicitudes de escritura.

**Formulario `ChildFormValues`:**

- `name`: nombre completo.
- `birthDate`: fecha de nacimiento.
- `classroom`: única opción, `Soles`.
- `allergies`: texto separado por comas.
- `notes`: notas médicas opcionales.

**Transformación al guardar:**

- Nombre sin espacios exteriores.
- ID único independiente del nombre; se permiten nombres repetidos.
- Inicial derivada del nombre y avatar con un color de la paleta existente.
- Edad calculada al guardar, teniendo en cuenta si ya cumplió años.
- Fecha de ingreso correspondiente al día del alta.
- Alergias sin entradas vacías ni duplicados, ignorando mayúsculas.
- `allergyLabel` contiene las etiquetas normalizadas para reutilizar la presentación actual.
- `parents` comienza vacío.
- Sin notas, el perfil muestra «Sin notas médicas».

Los datos introducidos deben ser ficticios, especialmente las notas médicas.

## Modal y validación

- Se abre sobre `/ninos`, sin cambiar la URL ni crear una página adicional.
- Conserva la tarjeta de ancho máximo de 520 px, encabezado y campos de la referencia.
- Añade fondo superpuesto y semántica de diálogo modal.
- Nombre, fecha y sala obligatorios.
- El nombre no puede contener únicamente espacios.
- La fecha debe existir y no ser futura.
- Alergias y notas son opcionales.
- Los errores aparecen junto al campo y se asocian accesiblemente.
- Un envío inválido mantiene abierto el modal y enfoca el primer campo inválido.
- Guardar añade exactamente un niño y cierra el modal.
- El nuevo niño se incorpora al final del listado y queda sujeto al filtro de búsqueda vigente.
- Cancelar, Escape o clic en el fondo cierran y descartan el formulario, sin confirmación.
- Reabrir presenta campos vacíos y sala Soles seleccionada.
- El foco queda dentro del modal mientras está abierto y vuelve a «Agregar niño» al cerrar.
- El fondo no recibe interacción ni se desplaza; el formulario puede desplazarse si no cabe.

## Listado y perfiles temporales

- Los nuevos niños participan en la búsqueda y el contador existentes.
- Sus tarjetas abren `/nino/[id]` y reutilizan la estructura del perfil actual.
- El perfil muestra los datos del alta y el estado sin padres vinculados.
- Volver al listado y navegar al feed no elimina las altas.
- Tras recargar, el perfil temporal muestra la página de no encontrado, sin sustituirlo por otro niño.
- Los ocho perfiles originales conservan acceso directo, recarga y prerenderizado.
- La resolución cliente de perfiles temporales no debe romper el comportamiento de IDs desconocidos.

## Hamburguesa móvil

### Por debajo de 768 px

- Sustituir el bloque superior actual por una cabecera compacta con marca y botón hamburguesa.
- Abrir un panel desde la izquierda con fondo superpuesto.
- Conservar navegación, sección activa, perfil y controles actuales.
- Cerrar mediante X, Escape, clic fuera o navegación.
- Bloquear el desplazamiento y la interacción del fondo.
- Mantener el foco dentro del panel y devolverlo al botón al cerrar.
- El botón comunica el estado abierto mediante `aria-expanded`.
- Al pasar a escritorio, cerrar el panel y liberar cualquier bloqueo.

### Desde 768 px

- Conservar el sidebar de 248 px y su comportamiento actual.
- No mostrar hamburguesa ni superposición.

## Organización de archivos

**Nuevos archivos:**

- `app/components/children/children-provider.tsx`: altas en memoria y acceso compartido.
- `app/components/children/add-child-modal.tsx`: diálogo y cierre.
- `app/components/children/child-form.tsx`: campos, validación y envío.
- `app/components/children/temporary-child-profile.tsx`: resolución del perfil temporal.
- `app/lib/child-form.ts`: normalización y transformación de datos.
- `app/components/feed/mobile-navigation.tsx`: cabecera y panel móvil.

**Archivos existentes:**

- `app/layout.tsx`: montar el proveedor sin convertir todo el layout en cliente.
- `app/ninos/page.tsx`: integrar el listado con el estado compartido.
- `app/components/children/children-directory.tsx`: apertura del modal, altas y filtrado.
- `app/nino/[id]/page.tsx`: integrar perfiles temporales sin perder los originales.
- `app/components/feed/sidebar.tsx`: integrar la variante móvil y compartir contenido.
- `app/components/feed/feed-icons.tsx`: iconos de apertura y cierre.
- `AGENTS.md`: actualizar el contexto funcional.

Reutilizar `ChildCard`, `ChildProfile` y la navegación existente.
Tailwind, nombres en inglés y sin nuevas dependencias.
Comentarios útiles en español, funciones pequeñas y sin abstracciones innecesarias.

## Plan de implementación

1. Consultar las guías locales y Context7 sobre contexto compartido, navegación, perfiles dinámicos y diálogos accesibles.
2. Incorporar el proveedor en memoria y la transformación validada de datos.
3. Integrar las altas en listado y perfiles temporales, conservando los originales.
4. Implementar el modal y activar «Agregar niño».
5. Incorporar hamburguesa, panel lateral y gestión de foco en móvil.
6. Completar adaptación responsive, estados vacíos y documentación de `AGENTS.md`.

Cada paso mantiene la aplicación ejecutable.
Sin commits automáticos.
Conservar `cacheComponents` y `partialPrefetching` y comprobar sus restricciones antes de modificar la resolución de perfiles.

## Criterios de aceptación

- [ ] «Agregar niño» abre el modal sin modificar la URL.
- [ ] El formulario reproduce los campos y valores iniciales acordados.
- [ ] Nombre vacío o compuesto solo por espacios impide guardar.
- [ ] Fecha vacía, inexistente o futura impide guardar.
- [ ] Los errores son visibles, están asociados al campo y se enfoca el primero.
- [ ] Alergias y notas vacías no impiden guardar.
- [ ] Las alergias descartan duplicados y entradas vacías.
- [ ] Cada envío válido crea exactamente un niño con ID único.
- [ ] Se permiten dos niños con el mismo nombre sin colisión.
- [ ] El alta aparece al final del listado sin filtros.
- [ ] Búsqueda y contador incluyen las altas.
- [ ] La edad considera correctamente el cumpleaños del año actual.
- [ ] El perfil temporal muestra los datos guardados, ingreso actual y ningún padre.
- [ ] Sin notas, el perfil muestra «Sin notas médicas».
- [ ] Navegar entre feed, listado y perfiles conserva las altas.
- [ ] Recargar elimina las altas y restaura los ocho niños originales.
- [ ] Recargar un perfil temporal muestra no encontrado.
- [ ] Los ocho perfiles originales y los IDs desconocidos mantienen su comportamiento.
- [ ] Cancelar, Escape y clic fuera descartan el formulario.
- [ ] Reabrir muestra el formulario vacío con Soles seleccionado.
- [ ] Modal y panel lateral gestionan foco, teclado y bloqueo del fondo.
- [ ] En móvil, la hamburguesa abre el panel con toda la navegación existente.
- [ ] X, Escape, clic fuera y navegación cierran el panel.
- [ ] Cambiar a escritorio libera bloqueos y restaura el sidebar de 248 px.
- [ ] Login y activación no incorporan sidebar ni hamburguesa.
- [ ] A 1440 × 900 se compara la tarjeta del modal con la referencia, con fuentes cargadas.
- [ ] A 375 × 812 no hay desbordamientos ni controles inaccesibles; el contenido largo se desplaza.
- [ ] Se verifica el breakpoint a 767 y 768 px.
- [ ] No se persisten ni transmiten los datos introducidos.
- [ ] No aparecen errores de consola ni hidratación.
- [ ] Build, typegen seguido de TypeScript y ESLint de `app/` finalizan correctamente.
- [ ] El lint global distingue los errores previos de `references/`.
- [ ] Las evidencias se guardan en `.playwright-mcp/`.

## Decisiones

- **Sí:** estado en memoria para conservar las altas durante la navegación.
- **No:** almacenamiento persistente de información médica en el navegador.
- **Sí:** modal sobre el listado.
- **No:** ruta independiente para agregar.
- **Sí:** una sola sala y reutilización del modelo existente.
- **Sí:** perfiles temporales, conservando los perfiles originales.
- **Sí:** hamburguesa solo móvil; escritorio conserva su diseño.
- **Sí:** descartar sin confirmación, por decisión acordada.
- **Sí:** mantener las acciones de gestión ajenas al alta como controles inertes.
- **No:** modificar las specs anteriores; esta spec sustituye su restricción de alta inerte y su navegación móvil únicamente dentro del alcance descrito.

## Riesgos

- Una recarga elimina las altas deliberadamente.
- Los perfiles temporales requieren resolver datos cliente sin alterar el prerenderizado original ni el comportamiento de IDs desconocidos.
- El modal y el panel pueden dejar bloqueos de foco o scroll; verificar cierre, navegación y cambio de viewport.
- Las fechas y edades dependen del calendario local al guardar; evitar conversiones de zona horaria que cambien el día introducido.
- La referencia presenta el formulario como tarjeta independiente, no como modal; conservar su diseño interno y verificar por separado el fondo y la interacción añadidos.

## Qué no incluye esta especificación

- Backend, autenticación ni almacenamiento persistente.
- Edición o eliminación de niños.
- Gestión de salas y vinculación de padres.
- Acciones funcionales de publicaciones, resúmenes o sesión.
- Cambios en login, activación o referencias visuales originales.
