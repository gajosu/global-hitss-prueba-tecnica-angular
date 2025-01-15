export interface User {
  id?: number;
  usuario: string;
  email: string;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido?: string;
  idDepartamento: number;
  idCargo: number;
  departamento: Departamento;
  cargo: Cargo;
}

export interface Departamento {
  id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
  idUsuarioCreacion: number;
}

export interface Cargo {
  id: number;
  codigo: string;
  nombre: string;
  activo: boolean;
  idUsuarioCreacion: number;
}
