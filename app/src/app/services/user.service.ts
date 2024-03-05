import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../enviroment';
import { ApiResponse } from '../models/ApiResponse';
import { User } from '../models/user';
import { PaginateResponse } from '../models/dto/paginate-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + '/Usuario';

  constructor(private http: HttpClient) { }

  getAllPaginate(page: number, pageSize: number): Observable<PaginateResponse<User>> {
    const request = { page, pageSize }
    return this.http.post<ApiResponse<PaginateResponse<User>>>(this.apiUrl + '/GetAllPaginate', request)
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error al obtener los artículos paginados:', error);
          return throwError(error);
        })
      );
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(this.apiUrl).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error al obtener los usuarios:', error);
        return throwError(error);
      })
    );
  }

  getUserById(id: string): Observable<User> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ApiResponse<User>>(url).pipe(
      map(response => response.data),
      catchError(error => {
        console.error(`Error al obtener el usuario con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  createUser(user: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(this.apiUrl, user).pipe(
      catchError(error => {
        console.error('Error al crear el usuario:', error);
        return throwError(error);
      })
    );
  }

  updateUser(user: User): Observable<ApiResponse<User>> {
    const url = `${this.apiUrl}/${user.id}`;
    return this.http.put<ApiResponse<User>>(url, user).pipe(
      catchError(error => {
        console.error(`Error al actualizar el usuario con ID ${user.id}:`, error);
        return throwError(error);
      })
    );
  }

  deleteUser(id: string): Observable<ApiResponse<void>> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ApiResponse<void>>(url).pipe(
      catchError(error => {
        console.error(`Error al eliminar el usuario con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  login(user: User): Observable<string> {
    return this.http.post<ApiResponse<string>>(`${this.apiUrl}/login`, user).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error al iniciar sesión:', error);
        return throwError(error);
      })
    );
  }
}
