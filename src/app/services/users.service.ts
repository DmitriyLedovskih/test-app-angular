import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IUser,
  IUserEdit,
  IUserFetch,
  IUsersFetch,
} from '../interfaces/user.interface';
import { BASE_URL } from '../utils/constans';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  loadingState: Record<number, boolean> = {};
  isLoading: boolean = false;
  http: HttpClient = inject(HttpClient);

  getUsers(): Observable<IUsersFetch> {
    return this.http.get<IUsersFetch>(`${BASE_URL}/users/?page=2`);
  }

  getUser(id: number): Observable<IUserFetch> {
    return this.http.get<IUserFetch>(`${BASE_URL}/users/${id}`);
  }

  editUser(id: number, data: IUserEdit): Observable<IUser> {
    return this.http.put<IUser>(`${BASE_URL}/users/${id}`, data);
  }

  deleteUser(id: number | null): Observable<null> {
    return this.http.delete<null>(`${BASE_URL}/users/${id}`);
  }
}
