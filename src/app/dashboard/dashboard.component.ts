import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private readonly http: HttpClient) {}

  public url: string = 'http://127.0.0.1:8000/products';
  public products$!: any;

  ngOnInit(): void {
    this.products$ = this.http.get<{
      id: number;
      name: string;
      price: number;
      sku: string;
      stock: number;
    }>(this.url);

    // this.http
    //   .get<{
    //     id: number;
    //     name: string;
    //     price: number;
    //     sku: string;
    //     stock: number;
    //   }>(this.url)
    //   .subscribe((response) => {
    //     this.products = response;
    //   });
  }
}
