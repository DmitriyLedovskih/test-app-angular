import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  IAuth,
  ILoginFetch,
  IRegisterFetch,
} from '../interfaces/auth.interface';
import { BASE_URL } from '../utils/constans';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  isLoading: boolean = false;

  register(data: IAuth): Observable<IRegisterFetch> {
    return this.http.post<IRegisterFetch>(`${BASE_URL}/register`, data);
  }

  login(data: IAuth): Observable<ILoginFetch> {
    return this.http.post<ILoginFetch>(`${BASE_URL}/login`, data);
  }

  logout(): Observable<null> {
    return this.http.post<null>(`${BASE_URL}/logout`, {});
  }
}
