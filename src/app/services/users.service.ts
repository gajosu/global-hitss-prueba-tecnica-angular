import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private endpoint = '/api/users';

  constructor(private api: ApiService) {}

  getUsers(): Observable<User[]> {
    return this.api.get<User[]>(this.endpoint);
  }

  createUser(user: User): Observable<User> {
    return this.api.post<User>(this.endpoint, user);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.api.put<User>(`${this.endpoint}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.api.delete<void>(`${this.endpoint}/${id}`);
  }
}
