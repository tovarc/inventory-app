import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'sales-table',
  templateUrl: './sales-table.component.html',
})
export class SalesTableComponent implements OnInit {
  constructor(private readonly apiService: ApiService) {}

  public sales$!: Observable<any[]>;

  ngOnInit(): void {
    this.sales$ = this.apiService.getAllSales();
  }
}
