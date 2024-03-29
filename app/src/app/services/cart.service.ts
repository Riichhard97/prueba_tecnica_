import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  private localStorageKey = 'cartItems';

  constructor() {
    const storedCartItems = localStorage.getItem(this.localStorageKey);
    if (storedCartItems) {
      this.cartItemsSubject.next(JSON.parse(storedCartItems));
    }
  }

  private updateCartItems(cartItems: CartItem[]): void {
    this.cartItemsSubject.next(cartItems);
    localStorage.setItem(this.localStorageKey, JSON.stringify(cartItems));
  }

  addToCart(item: CartItem): void {
    const currentItems = this.cartItemsSubject.getValue();
    const index = currentItems.findIndex(i => i.codigo === item.codigo);
    if (index !== -1) {
      currentItems[index].cantidad += item.cantidad;
    } else {
      currentItems.push(item);
    }
    this.updateCartItems(currentItems);
  }

  removeFromCart(item: CartItem): void {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(i => i.codigo !== item.codigo);
    this.updateCartItems(updatedItems);
  }

  clearCart(): void {
    this.updateCartItems([]);
  }
}
