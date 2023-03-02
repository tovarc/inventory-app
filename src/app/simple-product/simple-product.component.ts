import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../http/http-api.service';

@Component({
  selector: 'app-simple-product',
  templateUrl: './simple-product.component.html',
})
export class SimpleProductComponent implements OnInit {
  constructor(
    private readonly route: ActivatedRoute,
    private readonly http: HttpClient,
    private readonly apiService: ApiService
  ) {}

  public product!: any;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const url: string =
        'https://api-sales-app.josetovar.dev/products';

      this.apiService
        .getSingleProduct(params['productId'])
        .subscribe((response: any) => {
          this.product = response;
        });
    });
  }
}
