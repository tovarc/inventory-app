import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ApiService } from '../http/http-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly http: HttpClient,
    private readonly apiService: ApiService
  ) {}

  public url: string = 'http://127.0.0.1:8000/products';
  public products$!: Observable<any>;

  public updateProductForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.products$ = this.http.get<{
      id: number;
      name: string;
      price: number;
      sku: string;
      stock: number;
    }>(this.url);

    this.products$.subscribe((products) => {
      products.map((product: any) => {
        this.updateProductForm.addControl(
          `${product.id}`,
          new FormGroup({
            price: new FormControl(product.price, Validators.min(0)),
            stock: new FormControl(product.stock, Validators.min(0)),
          })
        );
      });
    });
  }

  public setUpdatedValues(product: any): void {
    const updatedValues = {
      ...product,
      ...this.updateProductForm.controls[product.id].value,
    };

    this.apiService
      .updateSingeProduct(updatedValues)
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  public setDisableValue(product: any): boolean {
    const { price, stock } = this.updateProductForm.controls[product.id].value;

    return price == product.price && stock == product.stock;
  }
}
