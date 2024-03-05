import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../enviroment';
import { Client } from '../models/client';
import { ApiResponse } from '../models/ApiResponse';
import { PaginateResponse } from '../models/dto/paginate-response';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = environment.apiUrl + '/Cliente';

  constructor(private http: HttpClient) { }

  getAllPaginate(page: number, pageSize: number): Observable<PaginateResponse<Client>> {
    const request = { page, pageSize }
    return this.http.post<ApiResponse<PaginateResponse<Client>>>(this.apiUrl + '/GetAllPaginate', request)
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error al obtener los artículos paginados:', error);
          return throwError(error);
        })
      );
  }

  getAll(): Observable<Client[]> {
    return this.http.get<ApiResponse<Client[]>>(this.apiUrl).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error al obtener los clientes:', error);
        return throwError(error);
      })
    );
  }

  getById(id: string): Observable<Client> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ApiResponse<Client>>(url).pipe(
      map(response => response.data),
      catchError(error => {
        console.error(`Error al obtener el cliente con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  create(client: Client): Observable<Client> {
    return this.http.post<ApiResponse<Client>>(this.apiUrl, client).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error al crear el cliente:', error);
        return throwError(error);
      })
    );
  }

  update(client: Client): Observable<Client> {
    const url = `${this.apiUrl}/${client.id}`;
    return this.http.put<ApiResponse<Client>>(url, client).pipe(
      map(response => response.data),
      catchError(error => {
        console.error(`Error al actualizar el cliente con ID ${client.id}:`, error);
        return throwError(error);
      })
    );
  }

  delete(id: string): Observable<undefined> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ApiResponse<void>>(url).pipe(
      map(() => undefined),
      catchError(error => {
        console.error(`Error al eliminar el cliente con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }
}
