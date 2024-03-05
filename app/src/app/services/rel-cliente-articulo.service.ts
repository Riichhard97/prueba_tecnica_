import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RelClienteArticulo } from '../models/rel-cliente-articulo';
import { CompraDto } from '../models/dto/compra-dto';
import { environment } from '../enviroment';

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

}
