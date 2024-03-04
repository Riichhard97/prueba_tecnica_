import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() { }

  addToCart(item: CartItem): void {
    const currentItems = this.cartItemsSubject.getValue();
    const index = currentItems.findIndex(i => i.codigo === item.codigo);
    if (index !== -1) {
      currentItems[index].cantidad += item.cantidad;
    } else {
      currentItems.push(item);
    }
    this.cartItemsSubject.next(currentItems);
  }

  removeFromCart(item: CartItem): void {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(i => i.codigo !== item.codigo);
    this.cartItemsSubject.next(updatedItems);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}
