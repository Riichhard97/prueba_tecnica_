import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { CartItem } from 'src/app/models/cart-item';
import Swal from 'sweetalert2';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit {
  articles: Article[] = [];
  stores: Store[] = [];

  storeSelected: Store | undefined;
  selectedStoreId: string = '';
  constructor(private cartService: CartService, private articleService: ArticleService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.loadStores();
  }

  loadStores() {
    this.storeService.getAll().subscribe((response) => {
      this.stores = response;
    });
  }


  onStoreChange(): void {
    // Aquí puedes agregar la lógica para cargar los artículos de la tienda seleccionada
    this.getStoreArticles();
  }

  getStoreArticles(): void {
    if (this.selectedStoreId) {
      this.storeService.getById(this.selectedStoreId).subscribe((response) => { // Obtén los artículos de la tienda seleccionada
        this.storeSelected = response;
      });
    }
  }
}
