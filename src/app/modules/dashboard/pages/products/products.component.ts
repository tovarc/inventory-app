import { formatCurrency } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { ApiService } from '../../../../core/http/api.service';

@Component({
  selector: 'app-dashboard-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  constructor(
    private readonly apiService: ApiService,
    private readonly toastr: ToastrService
  ) {}

  public products$!: Observable<any>;

  public page: number = 1;
  public rowsPerPage: number = 100;

  public updateProductForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.products$ = this.apiService.getAllProducts();

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

  public changePage(page: number) {
    this.page = page;
  }

  public setFilters(activeEvent: any): void {
    this.products$ = this.apiService.getAllProducts().pipe(
      map((products: any) => {
        if (activeEvent.target.value) {
          return products.filter(
            (product: any) =>
              product.active.toString() === activeEvent.target.value
          );
        } else {
          return products;
        }
      })
    );
  }

  public setFilterStock(): void {}

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

    this.apiService.updateSingleProduct(updatedValues).subscribe(
      (response: any) => {
        if (response)
          this.toastr.success(
            `Product with ID: ${product.id} has been updated successfully.`
          );
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public setDisableValue(product: any): boolean {
    const { price, stock } = this.updateProductForm.controls[product.id].value;

    return price == product.price && stock == product.stock;
  }

  public updateProductStatus(product: any, event: any) {
    const status = event.target.checked;

    this.apiService.updateProductStatus(product.id, status).subscribe({
      next: (response: any) => {
        if (response) {
          this.toastr.success(
            `Product with ID: ${product.id} has been activated successfully.`
          );
        }
      },
      error: (error: any) => {
        this.toastr.error(`Product with ID: ${product.id} does not exist.`);
      },
      complete: () => {
        console.log('Is good');
      },
    });
  }

  public deleteProduct(product: any) {
    this.apiService.deleteProduct(product.id).subscribe({
      next: (response: any) => {
        if (response) {
          this.toastr.success(
            `Product with ID: ${product.id} has been deleted successfully.`
          );
        }
      },
      error: (error: any) => {
        this.toastr.error(`Product with ID: ${product.id} does not exist.`);
      },
      complete: () => {
        console.log('Is good');
      },
    });
  }
}
