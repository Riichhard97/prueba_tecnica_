import { Component } from '@angular/core';
import { RelClienteArticulo } from 'src/app/models/rel-cliente-articulo';
import { RelClienteArticuloService } from 'src/app/services/rel-cliente-articulo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComprasComponent {
  relClienteArticulos: RelClienteArticulo[] = [];

  constructor(private relClienteArticuloService: RelClienteArticuloService) { }

  ngOnInit(): void {
    this.loadRelClienteArticulos();
  }

  loadRelClienteArticulos(): void {
    this.relClienteArticuloService.getAll().subscribe(
      (data: RelClienteArticulo[]) => {
        this.relClienteArticulos = data;
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }
}
