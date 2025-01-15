import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { DepartamentosService } from '../../services/departamentos.service';
import { CargosService } from '../../services/cargos.service';
import { Cargo, Departamento, User } from '../../models/user.interface';
import { forkJoin } from 'rxjs';

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
    'acciones'
  ];

  constructor(
    private usersService: UsersService,
    private departamentosService: DepartamentosService,
    private cargosService: CargosService
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
    console.log('Filtros:', { departamento: this.selectedDepartamento, cargo: this.selectedCargo });
  }

  openUserDialog(user?: User): void {
    console.log('Abrir diálogo para:', user);
  }

  deleteUser(id?: number): void {
    if (id) {
      this.usersService.deleteUser(id).subscribe(() => {
        this.loadInitialData();
      });
    }
  }
}
