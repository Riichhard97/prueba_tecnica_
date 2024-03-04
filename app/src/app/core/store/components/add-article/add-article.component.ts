import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {
  @Input() articles: any[] = [];
  @Output() articleSelected = new EventEmitter<any>();

  constructor() { }


  selectArticle() {
    this.articleSelected.emit(this.articles.filter(x => x.cantidad > 0));
  }


  currentPage = 1;
  itemsPerPage = 5; // Número de artículos por página

  get totalPages(): number {
    return Math.ceil(this.articles.length / this.itemsPerPage);
  }

  get pages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get visibleArticles(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.articles.slice(startIndex, startIndex + this.itemsPerPage);
  }
}
