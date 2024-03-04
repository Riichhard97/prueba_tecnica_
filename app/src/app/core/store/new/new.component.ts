import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { StoreService } from 'src/app/services/store.service';
import { Store } from 'src/app/models/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class CreateStoreComponent {
  store: Store = { sucursal: '', direccion: '', lstArticulos: [] };
  articlesAll: Article[] = [];

  articles: Article[] = [];
  selectedArticle: Article | undefined;
  modalOpen: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    this.loadArticles();
    const storeId = this.route.snapshot.paramMap.get('id');
    if (storeId) {
      this.storeService.getById(storeId).subscribe((response) => {
        this.store = response;
      });
    }
  }

  loadArticles(): void {
    this.articleService.getAll().subscribe((response) => {
      this.articlesAll = response;
      this.articles = JSON.parse(JSON.stringify(this.articlesAll));
    })
  }

  addArticle(): void {
    if (this.selectedArticle && !this.store.lstArticulos.find(a => a.id === this.selectedArticle!.id)) {
      this.store.lstArticulos.push(this.selectedArticle);
    }
  }

  removeArticle(article: Article | undefined): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar el artículo ${article?.descripcion} de la tienda?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.store.lstArticulos = this.store.lstArticulos.filter(a => a.id !== article?.id);
        Swal.fire({
          title: 'Eliminado',
          text: 'El artículo se ha eliminado correctamente',
          icon: 'success'
        });
      }
    });
  }

  save(): void {
    if (!this.store.id) {
      this.storeService.create(this.store).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Tienda creada',
          text: 'La tienda se ha creado correctamente',
        }).then(() => {
          this.router.navigate(['/store-list']);
        });
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la tienda',
          text: 'Ocurrió un error al intentar crear la tienda',
        });
      });
    } else {
      this.storeService.update(this.store).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Tienda actualizada',
          text: 'La tienda se ha actualizado correctamente',
        }).then(() => {
          this.router.navigate(['/store-list']);
        });
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al actualizar la tienda',
          text: 'Ocurrió un error al intentar actualizar la tienda',
        });
      });
    }
  }

  openModal() {
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }


  saveArticle(articles: Article[]) {
    articles.forEach((article: Article) => {
      const existingArticleIndex = this.store.lstArticulos.findIndex((x) => x.id === article.id);
      if (existingArticleIndex !== -1) {
        this.store.lstArticulos[existingArticleIndex].cantidad! += article.cantidad!;
      } else {
        this.store.lstArticulos.push(article);
      }
    });
    this.closeModal();
    this.articles = JSON.parse(JSON.stringify(this.articlesAll));
  }
}
