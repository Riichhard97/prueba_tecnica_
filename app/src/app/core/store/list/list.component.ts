import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-store-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class StoreListComponent implements OnInit {
  stores: Store[] = [];

  constructor(private router: Router, private storeService: StoreService) { }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores(): void {
    this.storeService.getAll().subscribe(
      (response) => {
        console.log(response)
        this.stores = response;
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
