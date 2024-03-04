import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CilenteListComponent implements OnInit {
  customers: Client[] = [];

  constructor(private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.clientService.getAll().subscribe((response) => {
      this.customers = response;
    });
  }

  editCustomer(customerId: string): void {
    this.router.navigate(['/create-customer', customerId]);
  }

  deleteCustomer(customer: Client): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este cliente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.delete(customer.id!).subscribe(() => {
          this.customers = this.customers.filter(c => c.id !== customer.id);
          Swal.fire(
            '¡Eliminado!',
            'El cliente ha sido eliminado.',
            'success'
          );
        }, error => {
          Swal.fire(
            'Error',
            'Hubo un problema al intentar eliminar el cliente.',
            'error'
          );
        });
      }
    });
  }

  addNewCustomer(): void {
    this.router.navigate(['/create-customer']);
  }
}
