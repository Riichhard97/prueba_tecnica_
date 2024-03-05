import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { FileService } from 'src/app/services/file.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  totalCount: number = 0;
  pageNumber = 1;
  pageSize = 10;

  urlApiImg = '';
  constructor(private router: Router, private articleService: ArticleService, private fileService: FileService) {
    this.urlApiImg = fileService.apiUrlPathImage;
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  onPageChange(pageNumber: number): void {
    this.pageNumber = pageNumber;
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAllPaginate(this.pageNumber, this.pageSize).subscribe(result => {
      this.articles = result.items;
      this.totalCount = result.totalCount;
    });
  }

  goToAddNew(): void {
    this.router.navigate(['/create-article']);
  }

  goToEdit(article: Article): void {
    this.router.navigate(['/edit-article', article.id]);
  }

  deleteArticle(article: Article): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.articleService.delete(article.id!).subscribe(() => {
          this.articles = this.articles.filter(a => a.id !== article.id);
          Swal.fire(
            'Eliminado',
            'El artículo ha sido eliminado correctamente',
            'success'
          );
        });
      }
    });
  }
}
