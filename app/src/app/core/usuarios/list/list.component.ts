import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  create(): void {
    this.router.navigate(['/usuario-nuevo']); // Redireccionar a la ruta '/new'
  }

  editUser(user: User): void {
    this.router.navigate(['/usuario-edicion', user.id]); // Redireccionar a la ruta '/edit/:id'
  }

  deleteUser(user: User): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar usuario'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.id!).subscribe(
          () => {
            Swal.fire(
              '¡Eliminado!',
              'El usuario ha sido eliminado.',
              'success'
            );
            // Eliminación exitosa, recargar la lista de usuarios
            this.loadUsers();
          },
          (error) => {
            console.error('Error al eliminar usuario:', error);
            Swal.fire(
              'Error',
              'Se produjo un error al intentar eliminar el usuario.',
              'error'
            );
          }
        );
      }
    });
  }
}
