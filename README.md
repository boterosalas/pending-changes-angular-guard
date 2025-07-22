# 🛡️ Arquetipo Angular – CanDeactivate Guard con Confirmación de Cambios no Guardados

Este proyecto es un **arquetipo en Angular** que demuestra una implementación completa y reutilizable del guard `CanDeactivate`. Su propósito es **proteger al usuario de perder cambios no guardados** en un formulario, mostrando una ventana modal de confirmación antes de abandonar la ruta.

## 📌 Objetivo

Prevenir que los usuarios abandonen un formulario con datos modificados sin haber guardado, solicitando confirmación antes de cambiar de ruta, y garantizando una navegación segura y controlada en aplicaciones Angular.

---

## 📷 Vista previa

> Al hacer clic sobre una fila, se abre el formulario de edición. Si realizas cambios y tratas de navegar fuera sin guardar, verás un mensaje de confirmación como este:

![Confirmación de salida sin guardar](./ruta-a-la-imagen/confirmacion-salida.png)

---

## ⚙️ Tecnologías utilizadas

Este arquetipo está desarrollado con:

| Tecnología                                       | Versión Estimada | Uso Principal                           |
| ------------------------------------------------ | ---------------- | --------------------------------------- |
| [Angular](https://angular.io/)                   | 19               | Framework base                          |
| [Angular Material](https://material.angular.io/) | 19               | Diálogos (MatDialog), diseño responsivo |
| [RxJS](https://rxjs.dev/)                        | 7+               | Observables, manejo reactivo            |
| TypeScript                                       | 5+               | Tipado estricto                         |
| SCSS                                             | -                | Estilos del proyecto                    |
| HTML Semántico                                   | -                | Estructura del DOM                      |
| Ruteo Angular (`@angular/router`)                | -                | Navegación y guards                     |

---

## Guard (`CanDeactivate`)

Este guard (`pendingChanges.guard.ts`) evalúa si el componente implementa la interfaz y tiene cambios pendientes:

- Si no hay cambios, se permite la navegación.
- Si hay cambios, se muestra un diálogo de confirmación usando `MatDialog`.

```
export const pendingChangesGuard: CanDeactivateFn<FormCanDeactivate> = (
  component
): Observable<boolean> => {
  const dialog = inject(MatDialog);

  if (!component.hasUnsavedChanges()) {
    component.dialogRef?.close();
    return of(true);
  }

  const dialogRef = dialog.open(ConfirmExitDialogComponent, {
    width: '400px',
    backdropClass: 'confirm-modal-backdrop'
  });

  return dialogRef.afterClosed().pipe(
    map((shouldClose) => {
      if (shouldClose) {
        component.dialogRef?.close();
        return true;
      }
      return false;
    })
  );
};
```

## Diálogo de confirmación (Angular Material)

Se muestra una ventana modal con el mensaje:

> “¿Deseas salir sin guardar los cambios?”

Botones disponibles:

- "Sí": continúa con la navegación.
- "No": cancela el cambio de ruta.

## Guardado del formulario

Una vez que el formulario se guarda con éxito, se invoca:

```
this.form.markAsPristine();
```

## Consideraciones adicionales

- El guard solo funciona si el componente objetivo está activo en la ruta.
- Si el formulario se abre en una ruta hija o como modal, debe mantenerse la referencia activa del componente en el árbol de rutas.
- Idealmente, el componente del formulario (EditFormComponent) puede ubicarse dentro de una carpeta components/ anidada dentro del componente contenedor (SummaryComponent) para mantener una arquitectura limpia.
