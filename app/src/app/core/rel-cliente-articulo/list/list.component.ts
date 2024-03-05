import { Component } from '@angular/core';
import { ListPaginateComponent } from 'src/app/components/list-paginate-component';
import { RelClienteArticulo } from 'src/app/models/rel-cliente-articulo';
import { RelClienteArticuloService } from 'src/app/services/rel-cliente-articulo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComprasComponent extends ListPaginateComponent {
  relClienteArticulos: RelClienteArticulo[] = [];

  constructor(private relClienteArticuloService: RelClienteArticuloService) {
    super();
  }

  ngOnInit(): void {
    this.load();
  }

  override load(): void {
    this.relClienteArticuloService.getAllPaginate(this.pageNumber, this.pageSize).subscribe(result => {
      this.relClienteArticulos = result.items;
      this.totalCount = result.totalCount;
    },
      (error) => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }
}
