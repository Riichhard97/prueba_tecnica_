import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class ClienteNewComponent implements OnInit {
  customer: Client = { nombre: '', apellidos: '', direccion: '' };
  editing = false;
  customerId: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id') || '';
    this.editing = this.customerId !== '';

    if (this.editing) {
      this.clientService.getById(this.customerId).subscribe(
        (response: Client) => {
          this.customer = response;
        },
        (error) => {
          console.error('Error fetching client:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al obtener los datos del cliente',
          });
        }
      );
    }
  }

  submitForm(): void {
    if (this.editing) {
      this.clientService.update(this.customer).subscribe(
        (response: Client) => {
          Swal.fire({
            icon: 'success',
            title: 'Cliente actualizado',
            text: 'El cliente se ha actualizado correctamente',
          }).then(() => {
            this.router.navigate(['/customer-list']);
          });
        },
        (error) => {
          console.error('Error updating client:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al actualizar el cliente',
          });
        }
      );
    } else {
      this.clientService.create(this.customer).subscribe(
        (response: Client) => {
          Swal.fire({
            icon: 'success',
            title: 'Cliente creado',
            text: 'El cliente se ha creado correctamente',
          }).then(() => {
            this.router.navigate(['/customer-list']);
          });
        },
        (error) => {
          console.error('Error creating client:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al crear el cliente',
          });
        }
      );
    }
  }
}
