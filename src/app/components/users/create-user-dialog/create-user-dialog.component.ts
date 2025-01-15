import { Component, Inject, OnInit } from '@angular/core';
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

interface DialogData {
  user?: User;
  departamentos: Departamento[];
  cargos: Cargo[];
  isEdit?: boolean;
}

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
export class CreateUserDialogComponent implements OnInit {
  userForm: FormGroup;
  departamentos: Departamento[] = [];
  cargos: Cargo[] = [];
  isLoading = false;
  isEdit = false;
  dialogTitle = 'Registrar usuario';

  constructor(
    private dialogRef: MatDialogRef<CreateUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private userService: UsersService
  ) {
    this.departamentos = data.departamentos;
    this.cargos = data.cargos;
    this.isEdit = data.isEdit || false;

    this.userForm = this.fb.group({
      id: [''],
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

  ngOnInit() {
    if (this.isEdit && this.data.user) {
      this.dialogTitle = 'Editar usuario';
      this.userForm.patchValue({
        id: this.data.user.id,
        usuario: this.data.user.usuario,
        email: this.data.user.email,
        primerNombre: this.data.user.primerNombre,
        segundoNombre: this.data.user.segundoNombre,
        primerApellido: this.data.user.primerApellido,
        segundoApellido: this.data.user.segundoApellido,
        idDepartamento: this.data.user.departamento.id,
        idCargo: this.data.user.cargo.id
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.isLoading = true;

      const request = this.isEdit ?
        this.userService.updateUser(this.userForm.value.id, this.userForm.value) :
        this.userService.createUser(this.userForm.value);

      request.pipe(
        finalize(() => this.isLoading = false)
      ).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
        },
        error: (error) => {
          console.error('Error al procesar usuario:', error);
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
