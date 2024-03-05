import { Component, Input } from '@angular/core';
import { take } from 'rxjs';
import { Store } from 'src/app/models/store';
import { CartService } from 'src/app/services/cart.service';
import { FileService } from 'src/app/services/file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.scss']
})
export class ArticleCardComponent {
  @Input() article: any;
  @Input() tienda: any;
  urlApiImage: string;

  constructor(private cartService: CartService, private fileService: FileService) {
    this.urlApiImage = this.fileService.apiUrlPathImage;
  }

  addToCart(item: any): void {
    console.log(this.article);
    console.log(this.tienda);
    this.cartService.cartItems$.pipe(
      take(1)
    ).subscribe((data) => {
      let article = { ...item };
      article.cantidad = 1;
      article.tiendaId = this.tienda.id;
      article.tienda = this.tienda.sucursal;
      if (data.length > 0) {
        let item = data[0];
        if (this.tienda.id != item.tiendaId) {
          Swal.fire({
            title: 'Tiendas diferentes',
            text: 'Se ha detectado el intento de agregar un nuevo articulo de una tienda diferente a los articulos actuales en el carrito. ¿Deseas cambiar de tienda? Esto vaciará tu carrito y agregará uno nuevo.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, agregar nuevo carrito',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.cartService.clearCart();
              this.sendToCart(article);
            }
          });
        } else {
          this.sendToCart(article);
        }
      } else {
        this.sendToCart(article);
      }
    });
  }
  sendToCart(article: any) {
    this.cartService.addToCart(article);
    Swal.fire({
      icon: 'success',
      title: 'Artículo agregado al carrito',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
