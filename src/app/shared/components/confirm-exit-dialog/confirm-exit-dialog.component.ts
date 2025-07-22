import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-exit-dialog',
  imports: [MatButtonModule],
  templateUrl: './confirm-exit-dialog.component.html',
  styleUrl: './confirm-exit-dialog.component.scss',
})
export class ConfirmExitDialogComponent {
  dialogRef: MatDialogRef<ConfirmExitDialogComponent> = inject(
    MatDialogRef<ConfirmExitDialogComponent>
  );
  closeModal(flat: boolean) {
    this.dialogRef.close(flat);
  }
}
