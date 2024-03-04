import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse } from '../models/ApiResponse';
import { Rol } from '../models/rol';
import { environment } from '../enviroment';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrl = environment.apiUrl + '/rol';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Rol[]> {
    return this.http.get<ApiResponse<Rol[]>>(this.apiUrl).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error al obtener los roles:', error);
        return throwError(error);
      })
    );
  }
}
