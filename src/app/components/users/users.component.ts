import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { DepartamentosService } from '../../services/departamentos.service';
import { CargosService } from '../../services/cargos.service';
import { Cargo, Departamento, User } from '../../models/user.interface';
import { forkJoin } from 'rxjs';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog/confirm-delete-dialog.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  departamentos: Departamento[] = [];
  cargos: Cargo[] = [];
  selectedDepartamento?: number;
  selectedCargo?: number;
  displayedColumns: string[] = [
    'usuario',
    'primerNombre',
    'apellidos',
    'departamento',
    'cargo',
    'email',
    'acciones'
  ];

  constructor(
    private usersService: UsersService,
    private departamentosService: DepartamentosService,
    private cargosService: CargosService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    forkJoin({
      users: this.usersService.getUsers(),
      departamentos: this.departamentosService.getDepartamentos(),
      cargos: this.cargosService.getCargos()
    }).subscribe({
      next: (data) => {
        this.users = data.users;
        this.departamentos = data.departamentos;
        this.cargos = data.cargos;
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
      }
    });
  }

  onFilterChange(): void {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        let filteredUsers = users;

        if (this.selectedDepartamento) {
          filteredUsers = filteredUsers.filter(user =>
            user.departamento.id === this.selectedDepartamento
          );
        }

        if (this.selectedCargo) {
          filteredUsers = filteredUsers.filter(user =>
            user.cargo.id === this.selectedCargo
          );
        }

        console.log(this.selectedDepartamento, this.selectedCargo);

        this.users = filteredUsers;
      },
      error: (error) => {
        console.error('Error al filtrar usuarios:', error);
      }
    });
  }

  openUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '100%',
      maxWidth: '70%',
      disableClose: true,
      data: {
        departamentos: this.departamentos,
        cargos: this.cargos
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.loadInitialData();
      }
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && user.id) {
        this.usersService.deleteUser(user.id).subscribe({
          next: () => {
            this.users = this.users.filter(u => u.id !== user.id);
          },
          error: (error) => {
            console.error('Error al eliminar usuario:', error);
          }
        });
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: '800px',
      maxWidth: '90vw',
      disableClose: true,
      data: {
        user: user,
        departamentos: this.departamentos,
        cargos: this.cargos,
        isEdit: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadInitialData();
      }
    });
  }
}
