import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../enviroment';
import { Article } from '../models/article';
import { ApiResponse } from '../models/ApiResponse';
import { PaginateResponse } from '../models/dto/paginate-response';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = environment.apiUrl + '/Articulo';

  constructor(private http: HttpClient) { }


  getAllPaginate(page: number, pageSize: number): Observable<PaginateResponse<Article>> {
    const request = { page, pageSize }
    return this.http.post<ApiResponse<PaginateResponse<Article>>>(this.apiUrl + '/GetAllPaginate', request)
      .pipe(
        map(response => response.data),
        catchError(error => {
          console.error('Error al obtener los artículos paginados:', error);
          return throwError(error);
        })
      );
  }

  getAll(): Observable<Article[]> {
    return this.http.get<ApiResponse<Article[]>>(this.apiUrl).pipe(
      map(response => response.data || []),
      catchError(error => {
        console.error('Error al obtener los artículos:', error);
        return throwError(error);
      })
    );
  }

  getById(id: string): Observable<Article> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ApiResponse<Article>>(url).pipe(
      map(response => response.data),
      catchError(error => {
        console.error(`Error al obtener el artículo con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }

  create(article: Article): Observable<Article> {
    return this.http.post<ApiResponse<Article>>(this.apiUrl, article).pipe(
      map(response => response.data),
      catchError(error => {
        console.error('Error al crear el artículo:', error);
        return throwError(error);
      })
    );
  }

  update(article: Article): Observable<Article> {
    const url = `${this.apiUrl}/${article.id}`;
    return this.http.put<ApiResponse<Article>>(url, article).pipe(
      map(response => response.data),
      catchError(error => {
        console.error(`Error al actualizar el artículo con ID ${article.id}:`, error);
        return throwError(error);
      })
    );
  }

  delete(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<ApiResponse<void>>(url).pipe(
      map(() => undefined),
      catchError(error => {
        console.error(`Error al eliminar el artículo con ID ${id}:`, error);
        return throwError(error);
      })
    );
  }
}
