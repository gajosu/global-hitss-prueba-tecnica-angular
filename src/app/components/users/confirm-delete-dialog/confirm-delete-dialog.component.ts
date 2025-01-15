import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  template: `
    <div class="confirm-delete-dialog">
      <h2 mat-dialog-title>¿Está seguro de eliminar el usuario seleccionado?</h2>

      <mat-dialog-actions align="end">
        <button mat-button class="confirm-delete-dialog__cancel-button" (click)="onCancel()">
          Cancelar
        </button>
        <button mat-raised-button
                class="confirm-delete-dialog__confirm-button"
                (click)="onConfirm()">
          Aceptar
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .confirm-delete-dialog {
      padding: 24px;

      &__cancel-button {
        background-color: #f5f5f5 !important;
        color: #666 !important;
        padding: 0 24px !important;
        height: 36px !important;
        border-radius: 4px !important;
        font-weight: normal !important;
        font-size: 14px !important;
        border: 1px solid #e0e0e0 !important;

        &:hover {
          background-color: #eeeeee !important;
        }
      }

      &__confirm-button {
        background-color: #0072bc !important;
        color: white !important;
        padding: 0 24px !important;
        height: 36px !important;
        border-radius: 4px !important;
        font-weight: normal !important;
        font-size: 14px !important;

        &:hover {
          background-color: #005a96 !important;
        }
      }
    }

    ::ng-deep {
      .mat-mdc-dialog-container {
        padding: 0 !important;
      }

      .mat-mdc-dialog-surface {
        border-radius: 8px !important;
        min-width: 400px !important;
      }

      .mat-mdc-dialog-title {
        margin: 0 0 24px !important;
        color: #333;
        font-size: 16px !important;
        font-weight: normal !important;
      }

      .mat-mdc-dialog-actions {
        padding: 0 !important;
        margin: 0 !important;
        gap: 8px;
      }
    }
  `]
})
export class ConfirmDeleteDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
