# SPEC 05 — Vinculación temporal de padres

> **Estado:** Borrador
> **Dependencias:** SPEC 02
> **Fecha:** 2026-11-26
> **Objetivo:** Vincular familiares a los ocho niños existentes mediante un modal que añade invitaciones pendientes en memoria, sin enviar correos.

## Alcance

**Incluye:**

- Activar «Vincular padre» y «Vincular otro padre» desde los perfiles.
- Modal basado en `references/pantallas/vincular-padre.dc.html`.
- Adaptar el nombre del niño en cabecera y texto informativo.
- Añadir familiares pendientes y conservarlos durante la navegación.
- Validación, accesibilidad y adaptación móvil.

**Fuera de alcance:**

- Backend, correo real, autenticación y almacenamiento persistente.
- Validación de invitaciones o conexión con `/activar-cuenta`.
- Edición, eliminación y reenvío de invitaciones.
- Compatibilidad con altas temporales de la SPEC 04.
- Modificar `references/` o importar su runtime.

## Datos y comportamiento

- Los ocho niños y sus padres originales conservan sus valores.
- Ampliar `Parent.relationship` para admitir `"Tutor/a"`.
- Un proveedor cliente guarda invitaciones nuevas por ID del niño.
- El proveedor permanece montado durante la navegación.
- Recargar o abrir otra pestaña elimina las invitaciones nuevas.
- No utilizar cookies, localStorage, sessionStorage ni solicitudes de escritura.

**Formulario `ParentInvitationValues`:**

- `name`: nombre completo.
- `email`: correo electrónico.
- `relationship`: `"Mamá" | "Papá" | "Tutor/a"`.

**Invitación `ParentInvitation`:**

- Reutiliza los campos de `Parent`.
- Añade `email`.
- Usa un ID único y estado `"pending"`.
- Deriva la inicial del nombre y reutiliza la paleta de avatares.

**Normalización y duplicados:**

- Eliminar espacios exteriores del nombre y email.
- Comparar emails sin distinguir mayúsculas.
- Bloquear un email repetido entre las invitaciones nuevas del mismo niño.
- Permitir el mismo email en distintos niños.
- No comprobar duplicados contra padres originales, que carecen de email.

## Modal y validación

- Abrir sobre el perfil sin cambiar la URL.
- Conservar la tarjeta de ancho máximo de 480 px y el diseño interno de referencia.
- Nombre y email inicialmente vacíos.
- «Mamá» seleccionada inicialmente.
- Selección única entre «Mamá», «Papá» y «Tutor/a».
- Nombre obligatorio y distinto de espacios.
- Email obligatorio y con formato válido.
- Mostrar errores junto al campo y asociarlos accesiblemente.
- Un envío inválido mantiene abierto el modal y enfoca el primer campo inválido.
- Un envío válido añade exactamente un familiar al final de la lista y cierra el modal.
- Botón y Enter ejecutan la misma validación y envío.
- X, Escape y clic fuera cierran y descartan sin confirmación.
- Reabrir restaura los valores iniciales.

## Diseño y accesibilidad

- Mostrar el código fijo `7K4P9` y «Vence en 7 días» como elementos ilustrativos.
- Añadir la nota visible: «Demostración: no se enviarán correos ni se activarán cuentas».
- No simular envío de correo, activación ni vencimiento.
- El familiar añadido aparece como «PENDIENTE», reutilizando la presentación existente.
- Usar diálogo modal con nombre accesible.
- Mantener el foco dentro y devolverlo al disparador al cerrar.
- Bloquear interacción y desplazamiento del fondo.
- Permitir desplazar el formulario cuando no quepa.
- Conservar tema claro, fuentes y paleta existentes.
- Evitar desbordamientos horizontales en móvil.

## Organización de archivos

**Nuevos archivos:**

- `app/components/children/parent-invitations-provider.tsx`: estado compartido por niño.
- `app/components/children/link-parent-modal.tsx`: diálogo y gestión de cierre y foco.
- `app/components/children/parent-invitation-form.tsx`: campos, validación y envío.
- `app/lib/parent-invitations.ts`: tipos, normalización y construcción de invitaciones.

**Archivos existentes:**

- `app/layout.tsx`: montar el proveedor sin convertir todo el layout en cliente.
- `app/data/children.ts`: admitir el parentesco `Tutor/a`.
- `app/components/children/child-profile.tsx`: proporcionar el contexto del niño.
- `app/components/children/linked-parents.tsx`: integrar invitaciones y activar el disparador.
- `AGENTS.md`: documentar el flujo y sus límites.

Reutilizar iconos y componentes existentes cuando encajen.
No añadir dependencias ni abstraer detalles triviales.
Los nombres del código se escriben en inglés.
Los comentarios, únicamente si aportan valor, se escriben en español.

## Plan de implementación

1. Consultar las guías locales y Context7 para las APIs utilizadas.
2. Incorporar tipos, normalización y proveedor de invitaciones en memoria.
3. Integrar las invitaciones pendientes en los perfiles sin alterar los datos originales.
4. Implementar formulario y validación de duplicados por niño.
5. Implementar el modal y activar ambos disparadores.
6. Completar comportamiento responsive, accesibilidad y documentación.

Cada paso mantiene la aplicación ejecutable.
No realizar commits automáticos.

## Criterios de aceptación

- [ ] Los ocho perfiles permiten abrir el modal sin cambiar la URL.
- [ ] Cabecera y texto informativo muestran el niño correspondiente.
- [ ] Los campos y el parentesco comienzan con los valores acordados.
- [ ] Las tres opciones de parentesco funcionan como selección única.
- [ ] Nombre vacío, solo espacios o email inválido impiden enviar.
- [ ] Los errores están asociados a los campos y se enfoca el primero.
- [ ] Botón y Enter producen el mismo resultado.
- [ ] Cada envío válido añade exactamente un familiar pendiente al niño correcto.
- [ ] Se normalizan espacios exteriores y se detectan emails repetidos sin distinguir mayúsculas.
- [ ] Un email puede utilizarse en distintos niños.
- [ ] Los padres originales permanecen intactos.
- [ ] Navegar entre perfiles, listado y feed conserva las invitaciones.
- [ ] Recargar elimina únicamente las invitaciones nuevas.
- [ ] X, Escape y clic fuera descartan el formulario.
- [ ] Reabrir restaura campos vacíos y «Mamá».
- [ ] El foco queda contenido y vuelve al disparador al cerrar.
- [ ] El fondo no recibe interacción ni se desplaza.
- [ ] Se muestran el código fijo, vencimiento ilustrativo y aviso de demostración.
- [ ] No se transmiten ni persisten los datos introducidos.
- [ ] `/activar-cuenta` conserva su comportamiento actual.
- [ ] A 1440 × 900 se compara la tarjeta con la referencia, considerando el aviso añadido.
- [ ] A 375 × 812 no hay desbordamiento horizontal ni controles inaccesibles.
- [ ] Las evidencias se guardan en `.playwright-mcp/`, con iguales viewport y scroll y fuentes cargadas.
- [ ] No aparecen errores de ejecución ni hidratación.
- [ ] Build, generación de tipos, TypeScript y ESLint de `app/` finalizan correctamente.
- [ ] El lint global distingue los errores previos de `references/`.

## Decisiones

- **Sí:** modal sobre el perfil para conservar el contexto.
- **Sí:** estado en memoria, independiente de la SPEC 04.
- **Sí:** reutilizar la presentación de padres pendientes.
- **Sí:** bloquear duplicados solo entre invitaciones nuevas del mismo niño.
- **No:** inventar emails para los padres originales.
- **Sí:** código fijo y aviso visible para identificar la demostración.
- **No:** conectar invitaciones con activación ni simular correos reales.
- **Sí:** descartar el formulario al cerrar, sin confirmación.
- **No:** modificar specs anteriores; esta sustituye únicamente la restricción de vinculación inerte.

## Riesgos

- La referencia promete correo y vencimiento reales; el aviso visible aclara que son demostrativos.
- La SPEC 04 introduce otro proveedor compartido; una integración posterior deberá evitar estados duplicados.
- Una recarga elimina deliberadamente las invitaciones nuevas.

## Qué no incluye esta especificación

- Correo real, backend, sesiones o persistencia.
- Activación o vencimiento efectivo de códigos.
- Gestión posterior de invitaciones.
- Vinculación con niños temporales de la SPEC 04.
