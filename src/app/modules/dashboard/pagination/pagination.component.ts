import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() rows!: Observable<any>;
  @Input() rowsPerPage!: number;
  @Output() changePageTo = new EventEmitter<number>();

  public currentPage: number = 1;

  public infoPages: any = {
    current: 0,
    pages: [],
  };

  ngOnInit(): void {
    this.getPages();
  }

  ngOnChanges(): void {
    this.getPages();
    this.changePageTo.emit(1);
  }

  public getPages(): void {
    this.rows.subscribe((res) => {
      this.infoPages.pages = [];

      for (const [i, value] of res.entries()) {
        if (
          this.infoPages.current + 1 == this.rowsPerPage ||
          (this.infoPages.current < this.rowsPerPage && i === res.length - 1)
        ) {
          this.infoPages.pages.push(this.infoPages.pages.length + 1);
          this.infoPages.current = 0;
        } else {
          this.infoPages.current += 1;
        }
      }
    });
  }

  public getPreviousPage(currentPage: number): void {
    const page = currentPage - 1;

    this.currentPage = page;
    this.changePageTo.emit(page);
  }
  
  public getNextPage(currentPage: number): void {
    const page = currentPage + 1;

    this.currentPage = page;
    this.changePageTo.emit(page);
  }

  public onChangePageTo(page: number): void {
    this.currentPage = page;
    this.changePageTo.emit(page);
  }
}
