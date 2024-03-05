import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item';
import { CompraDetDto, CompraDto } from 'src/app/models/dto/compra-dto';
import { CartService } from 'src/app/services/cart.service';
import { FileService } from 'src/app/services/file.service';
import { RelClienteArticuloService } from 'src/app/services/rel-cliente-articulo.service';
import Swal from 'sweetalert2';
import jwt_decode from "jwt-decode";
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems$: Observable<CartItem[]> = this.cartService.cartItems$;
  urlApiImg: string;

  tienda: any;
  tiendaId: string = '';
  constructor(private cartService: CartService, private fileService: FileService, private relClienteArticuloService: RelClienteArticuloService, private storeService: StoreService) {
    this.urlApiImg = fileService.apiUrlPathImage;
  }

  ngOnInit(): void {
    this.cartService.cartItems$.pipe(take(1)).subscribe((cartItems) => {
      if (cartItems.length > 0) {
        this.tienda = cartItems[0].tienda;
        this.tiendaId = cartItems[0].tiendaId;

        this.storeService.getById(this.tiendaId).subscribe((response) => {
          this.tienda = response;

          cartItems.forEach(item => {
            const foundArticle = response.lstArticulos.find(article => article.id === item.id);
            if (foundArticle) {
              item.stock = foundArticle.cantidad!;
            }
            console.log(item);
            console.log(response.lstArticulos);
          });
          console.log(this.tienda);
        });
      }
    })


  }

  removeFromCart(item: CartItem): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas eliminar este artículo del carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(item);
        Swal.fire(
          'Eliminado',
          'El artículo ha sido eliminado del carrito',
          'success'
        );
      }
    });
  }

  clearCart(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Deseas vaciar el carrito?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, vaciar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.clearCart();
        Swal.fire(
          'Vacío',
          'El carrito ha sido vaciado',
          'success'
        );
      }
    });
  }

  comprar() {
    const decodedToken: any = jwt_decode(localStorage.getItem("token")!);
    const clientId = decodedToken.Id;

    let compra: CompraDto = {
      clientId: clientId,
      articles: []
    }

    let subscribe = this.cartItems$.pipe().subscribe((cartItems) => {
      compra.articles = cartItems.map((item) => {
        let compraDetDto: CompraDetDto = {
          articuloId: item.id,
          cantidad: item.cantidad
        }
        return compraDetDto;
      })
      this.relClienteArticuloService.create(compra).subscribe(() => {
        Swal.fire(
          'Compra realizada',
          'Tu compra se ha realizado con éxito',
          'success'
        );
        this.cartService.clearCart();
        subscribe.unsubscribe();
      })
    })
  }
}
