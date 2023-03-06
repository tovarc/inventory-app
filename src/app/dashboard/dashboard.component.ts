import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../http/http-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(
    private readonly http: HttpClient,
    private readonly apiService: ApiService,
    private readonly toastr: ToastrService
  ) {}

  public url: string = 'https://api-sales-app.josetovar.dev/products';
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
            price: new FormControl(formatCurrency(product.price, 'en-US', '$')),
            stock: new FormControl(product.stock, Validators.min(0)),
          })
        );
      });
    });
  }

  public setFormatCurrency(product: any, event: any): void {
    const price = formatCurrency(
      this.getValueFromCurrency(event.target.value),
      'en-US',
      '$'
    );

    this.updateProductForm.controls[product.id.toString()]
      .get('price')
      ?.setValue(price);
  }

  public getValueFromCurrency(value: string): number {
    let price: number;

    if (value.includes('$')) {
      price = Number(value.substring(1).replaceAll(',', ''));
    } else {
      price = Number(value.replaceAll(',', ''));
    }

    return price;
  }

  public setUpdatedValues(product: any): void {
    const { price } = this.updateProductForm.controls[product.id].value;

    const updatedValues = {
      ...product,
      ...this.updateProductForm.controls[product.id].value,
      price: +price.substring(1).replaceAll(',', '').replaceAll('.', ''),
    };

    this.apiService
      .updateSingeProduct(updatedValues)
      .subscribe((response: any) => {
        if (response)
          this.toastr.success(
            `Product with ID: ${product.id} has been updated successfully.`
          );
      });
  }

  public setDisableValue(product: any): boolean {
    const { price, stock } = this.updateProductForm.controls[product.id].value;

    return price == product.price && stock == product.stock;
  }

  public updateProductStatus(product: any, event: any) {
    const status = event.target.checked;

    this.http
      .put(
        `https://api-sales-app.josetovar.dev/product-status/${product.id}?status=${status}`,
        {}
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.toastr.success(
              `Product with ID: ${product.id} has been activated successfully.`
            );
          }
        },
        error: (error) => {
          this.toastr.error(`Product with ID: ${product.id} does not exist.`);
        },
        complete: () => {
          console.log('Is good');
        },
      });

    // console.log(event.target.checked);
  }

  public deleteProduct(product: any) {
    this.http
      .delete(`https://api-sales-app.josetovar.dev/products/${product.id}`)
      .subscribe({
        next: (response) => {
          if (response) {
            this.toastr.success(
              `Product with ID: ${product.id} has been deleted successfully.`
            );
          }
        },
        error: (error) => {
          this.toastr.error(`Product with ID: ${product.id} does not exist.`);
        },
        complete: () => {
          console.log('Is good');
        },
      });
  }
}
