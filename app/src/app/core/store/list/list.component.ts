import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store';
import Swal from 'sweetalert2';
import { ListPaginateComponent } from 'src/app/components/list-paginate-component';

@Component({
  selector: 'app-store-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class StoreListComponent extends ListPaginateComponent implements OnInit {
  stores: Store[] = [];

  constructor(private router: Router, private storeService: StoreService) {
    super();
  }

  ngOnInit(): void {
    this.load();
  }

  override load(): void {
    this.storeService.getAllPaginate(this.pageNumber, this.pageSize).subscribe(result => {
      this.stores = result.items;
      this.totalCount = result.totalCount;
    },
      (error) => {
        Swal.fire('Error', 'Error al cargar las tiendas', 'error');
        console.error('Error al cargar las tiendas:', error);
      }
    );
  }

  createStore(): void {
    this.router.navigate(['/create-store']);
  }

  editStore(store: Store): void {
    this.router.navigate(['/create-store', store.id]);
  }

  deleteStore(store: Store): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.storeService.delete(store.id!).subscribe(
          () => {
            this.stores = this.stores.filter(s => s.id !== store.id);
            Swal.fire('¡Eliminado!', 'La tienda ha sido eliminada.', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error al eliminar la tienda', 'error');
            console.error('Error al eliminar la tienda:', error);
          }
        );
      }
    });
  }
}
