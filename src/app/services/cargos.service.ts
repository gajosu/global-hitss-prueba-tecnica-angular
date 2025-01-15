import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Cargo } from '../models/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargosService {
  private endpoint = '/api/cargos';

  constructor(private api: ApiService) {}

  getCargos(): Observable<Cargo[]> {
    return this.api.get<Cargo[]>(this.endpoint);
  }
}
