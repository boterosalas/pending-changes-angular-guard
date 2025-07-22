# 🛡️ Arquetipo Angular – CanDeactivate Guard con Confirmación de Cambios no Guardados

Este proyecto es un **arquetipo en Angular** que demuestra una implementación completa y reutilizable del guard `CanDeactivate`. Su propósito es **proteger al usuario de perder cambios no guardados** en un formulario, mostrando una ventana modal de confirmación antes de abandonar la ruta.

## 📌 Objetivo

Prevenir que los usuarios abandonen un formulario con datos modificados sin haber guardado, solicitando confirmación antes de cambiar de ruta, y garantizando una navegación segura y controlada en aplicaciones Angular.

---

## 🧪 Cómo interactuar con el demo

Puedes ver rápidamente el demo [aquí](https://boterosalas.github.io/pending-changes-angular-guard/)

Este proyecto incluye dos escenarios para demostrar cómo funciona un CanDeactivate en Angular al intentar salir de un formulario con cambios no guardados:

### Selección de modo de visualización

Antes de crear o editar un elemento, puedes elegir entre dos modos de visualización mediante un selector de tipo `radio`:

- **Page**: Abre el formulario de creación/edición en una nueva página. Este enfoque es útil cuando deseas una navegación tradicional entre rutas.

- **Modal**: Muestra el formulario en una ventana modal, pero también cambia la ruta (por ejemplo, de `/summary` a `/summary/edit/:id`). Este enfoque mantiene visualmente al usuario en el contexto del listado, pero permite aplicar correctamente el `CanDeactivate` gracias al cambio de ruta. Es ideal para casos donde se quiere mantener el estado del listado visible, pero con control de navegación segura.

> En ambos casos, si el usuario intenta salir con cambios sin guardar, se activará el guard que mostrará una advertencia para confirmar la acción.

---

## 📷 Vista previa

Al hacer clic sobre una fila, se abre el formulario de edición. Si realizas cambios y tratas de navegar fuera sin guardar, verás un mensaje de confirmación como este:

- **Listado de elementos**
  ![Listado de elementos](./public/listado-elementos.png)

- **Formulario en formato de modal**
  ![Modal formulario](./public/modal-formulario.png)

- **Formulario en formato page**
  ![Page formulario](./public/page-formulario.png)

- **Modal confirmación de salida**
  ![Confirmación de salida sin guardar](./public/modal-confirmacion.png)

---

## ⚙️ Tecnologías utilizadas

Este arquetipo está desarrollado con:

| Tecnología                        | Versión Estimada | Uso Principal                           |
| --------------------------------- | ---------------- | --------------------------------------- |
| Angular                           | 19               | Framework base                          |
| Angular Material                  | 19               | Diálogos (MatDialog), diseño responsivo |
| RxJS                              | 7+               | Observables, manejo reactivo            |
| TypeScript                        | 5+               | Tipado estricto                         |
| SCSS                              | -                | Estilos del proyecto                    |
| HTML Semántico                    | -                | Estructura del DOM                      |
| Ruteo Angular (`@angular/router`) | -                | Navegación y guards                     |

---

## 🔐 Guard (`CanDeactivate`)

Este guard (`pendingChanges.guard.ts`) evalúa si el componente implementa la interfaz y tiene cambios pendientes:

- Si no hay cambios, se permite la navegación.
- Si hay cambios, se muestra un diálogo de confirmación usando `MatDialog`.

```
import { CanDeactivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Observable, map, of } from 'rxjs';
import { ConfirmExitDialogComponent } from '../../shared/components/confirm-exit-dialog/confirm-exit-dialog.component';

export interface FormCanDeactivate {
  hasUnsavedChanges(): boolean;
  dialogRef?: MatDialogRef<any>;
}

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

---

## 💬 Diálogo de confirmación (Angular Material)

Se muestra una ventana modal con el mensaje:

> “¿Deseas salir sin guardar los cambios?”

Botones disponibles:

- "Sí": continúa con la navegación.
- "No": cancela el cambio de ruta.

---

## ✅ Guardado del formulario

Una vez que el formulario se guarda con éxito, se invoca:

```
this.form.markAsPristine();
```

---

## ➕ Consideraciones adicionales

- El guard solo funciona si el componente objetivo está activo en la ruta.
- Si el formulario se abre en una ruta hija o como modal, debe mantenerse la referencia activa del componente en el árbol de rutas.
