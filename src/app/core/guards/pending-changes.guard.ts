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
