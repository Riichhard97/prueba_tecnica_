import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartLength = 0;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartLength = items.length;
    })
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

}
