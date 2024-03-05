import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RelClienteArticulo } from '../models/rel-cliente-articulo';
import { CompraDto } from '../models/dto/compra-dto';
import { environment } from '../enviroment';
import { ApiResponse } from '../models/ApiResponse';
import { PaginateResponse } from '../models/dto/paginate-response';

@Injectable({
  providedIn: 'root'
})
export class RelClienteArticuloService {
  private apiUrl = environment.apiUrl + '/RelClienteArticulo';

  constructor(private http: HttpClient) { }

  getAll(): Observable<RelClienteArticulo[]> {
    return this.http.get<RelClienteArticulo[]>(`${this.apiUrl}`);
  }

  getById(id: string): Observable<RelClienteArticulo> {
    return this.http.get<RelClienteArticulo>(`${this.apiUrl}/${id}`);
  }

  create(objCompra: CompraDto): Observable<RelClienteArticulo> {
    return this.http.post<RelClienteArticulo>(`${this.apiUrl}`, objCompra);
  }

  getAllPaginate(page: number, pageSize: number): Observable<PaginateResponse<RelClienteArticulo>> {
    const request = { page, pageSize }
    return this.http.post<ApiResponse<PaginateResponse<RelClienteArticulo>>>(this.apiUrl + '/GetAllPaginate', request)
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error al obtener los artículos paginados:', error);
          return throwError(error);
        })
      );
  }
}
