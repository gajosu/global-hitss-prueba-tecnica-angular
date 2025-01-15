import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User, Departamento, Cargo } from '../../../models/user.interface';
import { MatIconModule } from '@angular/material/icon';
import { finalize } from 'rxjs/operators';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-create-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent {
  userForm: FormGroup;
  departamentos: Departamento[] = [];
  cargos: Cargo[] = [];
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<CreateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { departamentos: Departamento[], cargos: Cargo[] },
    private fb: FormBuilder,
    private userService: UsersService
  ) {
    this.departamentos = data.departamentos;
    this.cargos = data.cargos;

    this.userForm = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      primerNombre: ['', Validators.required],
      segundoNombre: ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido: ['', Validators.required],
      idDepartamento: ['', Validators.required],
      idCargo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;

      this.userService.createUser(this.userForm.value)
        .pipe(
          finalize(() => this.isLoading = false)
        )
        .subscribe({
          next: (response) => {
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Error al crear usuario:', error);
            // Aquí podrías agregar un manejo de errores más específico
            // Por ejemplo, mostrar un mensaje al usuario
          }
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
