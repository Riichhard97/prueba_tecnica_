import { Component, Input } from '@angular/core';
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
  urlApiImage: string;

  constructor(private cartService: CartService, private fileService: FileService) {
    this.urlApiImage = this.fileService.apiUrlPathImage;
  }

  addToCart(item: any): void {
    let article = { ...item };
    article.cantidad = 1;

    this.cartService.addToCart(article);
    Swal.fire({
      icon: 'success',
      title: 'Artículo agregado al carrito',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
