import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '../models/store';
import { environment } from '../enviroment';
import { ApiResponse } from '../models/ApiResponse';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = environment.apiUrl + '/tienda';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Store[]> {
    return this.http.get<ApiResponse<Store[]>>(this.apiUrl).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error al obtener las tiendas:', error);
        return throwError(error);
      })
    );
  }

  getById(id: string): Observable<Store> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ApiResponse<Store>>(url).pipe(
      map(response => response.data),
      catchError(error => {
        console.error(`Error al obtener la tienda con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  create(store: Store): Observable<Store> {
    return this.http.post<ApiResponse<Store>>(this.apiUrl, store).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error al crear la tienda:', error);
        return throwError(error);
      })
    );
  }

  update(store: Store): Observable<Store> {
    const url = `${this.apiUrl}/${store.id}`;
    return this.http.put<ApiResponse<Store>>(url, store).pipe(
      map(response => response.data),
      catchError(error => {
        console.error(`Error al actualizar la tienda con ID ${store.id}:`, error);
        return throwError(error);
      })
    );
  }

  delete(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ApiResponse<void>>(url).pipe(
      map(() => undefined),
      catchError(error => {
        console.error(`Error al eliminar la tienda con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }
}
