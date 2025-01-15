import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Departamento } from '../models/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentosService {
  private endpoint = '/api/departamentos';

  constructor(private api: ApiService) {}

  getDepartamentos(): Observable<Departamento[]> {
    return this.api.get<Departamento[]>(this.endpoint);
  }
}
