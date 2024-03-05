import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './paginaton.component.html',
  styleUrls: ['./paginaton.component.scss']
})
export class PaginatonComponent implements OnInit {
  @Input() pageNumber: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalCount: number = 0;
  @Output() pageChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPageChange(page: number): void {
    this.pageChange.emit(page);
  }

  getPages(): number[] {
    const pageCount = Math.ceil(this.totalCount / this.pageSize);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}
