import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnChanges {
  @Input() totalItemsCount!: number;
  @Input() currentPage!: number;
  @Input() pageSize!: number;
  @Output() changePage: EventEmitter<{pageNumber: number, pageSize: number}> = new EventEmitter();

  portionSize = 10;
  pagesCount = 0;
  portionCount = 0;
  portionNumber = 1;
  pages: number[] = [];
  filteredPages: number[] = []

  ngOnChanges(changes: SimpleChanges) {
    if(changes['totalItemsCount']) {
      this.pagesCount = Math.ceil(this.totalItemsCount / this.pageSize)
      this.portionCount  = Math.ceil(this.pagesCount / this.portionSize);
      this.pages = this.getPages();
      this.filteredPages = this.getFilteredPages();
    }
  }


  private getPages(): number[] {
    const pages = []
    for (let i = 1; i <= this.pagesCount; i++) {
      pages.push(i);
    }
    return pages
  }

  private getFilteredPages(): number[] {
    return this.pages.filter(p => p >= this.leftPortionPageNumber && p <= this.rightPortionPageNumber)
  }

  increasePortionNumber(): void {
    this.portionNumber++;
    this.filteredPages = this.getFilteredPages()
  }

  decreasePortionNumber(): void  {
    this.portionNumber--;
    this.filteredPages = this.getFilteredPages()
  }

  onPageChanged(page: number): void {
    if(page !== this.currentPage) {
      this.changePage.emit({pageNumber: page, pageSize: this.pageSize});
    }
  }

  get leftPortionPageNumber(): number {
    return (this.portionNumber - 1) * this.portionSize + 1;
  }

  get rightPortionPageNumber(): number {
    return this.portionNumber * this.portionSize;
  }
}
