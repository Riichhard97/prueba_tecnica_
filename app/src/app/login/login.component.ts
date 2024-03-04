import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: any = { correo: '', password: '' };

  constructor(private router: Router, private userService: UserService) { }

  login() {
    console.log(this.user)
    this.userService.login(this.user).subscribe(
      (response: string) => {
        if (response) {
          localStorage.clear();


          const decodedToken: any = jwt_decode(response);
          const roleId: string = decodedToken.role.toUpperCase();
          const email: string = decodedToken.Email;
          const exp: string = decodedToken.exp;
          console.log('decodedToken', decodedToken)
          localStorage.setItem('token', response);
          localStorage.setItem('roleId', roleId);
          localStorage.setItem('email', email);
          localStorage.setItem('exp', exp);



          location.replace('home');
        } else {
          Swal.fire('Error', 'Error al iniciar sesión', 'error');
        }
      },
      (error) => {
        localStorage.clear();
        Swal.fire('Error', 'Error al iniciar sesión', 'error');
      }
    );
  }
}


