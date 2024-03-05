import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RolEnum } from 'src/app/models/enums/role-enum';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartLength = 0;
  menu: string[] = [

  ]

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartLength = items.length;
    })

    this.createMenu();
  }
  createMenu() {
    setTimeout(() => {
      const roleId = localStorage.getItem('roleId')
      console.log(roleId)
      if (roleId == RolEnum.Cliente) {
        this.menu = [
          'home',
          'market',
          'cart'
        ]
      }


      if (roleId == RolEnum.Administrador) {
        this.menu = [
          'home',
          'customer-list',
          'store-list',
          'articles-list',
          'usuarios',
          'market',
          'cart'
        ]
      }


    }, 0);
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
