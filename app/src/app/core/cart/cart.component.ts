import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
