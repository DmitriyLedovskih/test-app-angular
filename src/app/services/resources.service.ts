import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResourceFetch } from '../interfaces/resource.interface';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  isLoading: boolean = false;
  http: HttpClient = inject(HttpClient);

  getResources(): Observable<IResourceFetch> {
    return this.http.get<IResourceFetch>('https://reqres.in/api/unknown');
  }
}
