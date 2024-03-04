import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ClientService } from 'src/app/services/client.service';
import { User } from 'src/app/models/user';
import { Client } from 'src/app/models/client';
import Swal from 'sweetalert2';
import { RolService } from 'src/app/services/rol.service';
import { Rol } from 'src/app/models/rol';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class UserNewComponent implements OnInit {
  user: User = { nombreUsuario: '', correo: '', clienteId: '', roleId: '', fechaUltimoAcceso: new Date() };
  roles: Rol[] = [];
  clientes: Client[] = [];
  isEdit: boolean = false;
  userId: string = '';

  constructor(
    private userService: UserService,
    private rolService: RolService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.isEdit = true;
      this.loadUser(this.userId);
    } else {
      this.loadRoles();
      this.loadClientes();
    }
  }

  loadUser(id: string): void {
    this.userService.getUserById(id).subscribe(
      (data: User) => {
        this.user = data;
        this.loadRoles();
        this.loadClientes();
      },
      (error) => {
        console.error('Error al cargar usuario:', error);
      }
    );
  }

  loadRoles(): void {
    this.rolService.getAll().subscribe(
      (data: Rol[]) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al cargar roles:', error);
      }
    );
  }

  loadClientes(): void {
    this.clientService.getAll().subscribe(
      (data: Client[]) => {
        this.clientes = data;
      },
      (error) => {
        console.error('Error al cargar clientes:', error);
      }
    );
  }

  saveUser(): void {
    if (this.isEdit) {
      this.userService.updateUser(this.user!).subscribe(
        () => {
          Swal.fire(
            '¡Éxito!',
            'El usuario ha sido actualizado.',
            'success'
          );
          this.router.navigate(['/usuarios']);
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    } else {
      this.userService.createUser(this.user!).subscribe(
        () => {
          Swal.fire(
            '¡Éxito!',
            'El usuario ha sido creado.',
            'success'
          );
          this.router.navigate(['/usuarios']);
        },
        (error) => {
          console.error('Error al crear usuario:', error);
        }
      );
    }
  }
}
