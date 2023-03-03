import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
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

  public url: string = 'https://api-sales-app.josetovar.dev/products';
  public products$!: Observable<any>;

  public updateProductForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    // const myString: string = 'word.word.word';

    // console.log(myString.replace('.', '$'));
    // console.log(myString.replaceAll('.', '$'));

    // const myNumber: string = '24343';
    // console.log(myNumber);
    // console.log(Number(myNumber));

    // console.log(+myNumber);

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

    // Methods for string
    // 1. includes
    // 2. substring()
    // 3. replaceAll

    return price;
  }

  public setUpdatedValues(product: any): void {
    const updatedValues = {
      ...product,
      ...this.updateProductForm.controls[product.id].value,
    };

    console.log(updatedValues);

    // this.apiService
    //   .updateSingeProduct(updatedValues)
    //   .subscribe((response: any) => {
    //     console.log(response);
    //   });
  }

  public setDisableValue(product: any): boolean {
    const { price, stock } = this.updateProductForm.controls[product.id].value;

    return price == product.price && stock == product.stock;
  }
}
