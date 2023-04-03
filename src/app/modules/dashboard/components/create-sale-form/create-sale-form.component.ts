import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'create-sale-form',
  templateUrl: './create-sale-form.component.html',
})
export class CreateSaleFormComponent implements OnInit {
  constructor(
    private readonly apiService: ApiService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  public orderTotal: number = 0;

  public clients!: any[];
  public clientsList!: any[];

  public products!: any[];
  public productsList!: any[];

  public showClientSelector: boolean = false;
  public showProductSelector: boolean = false;

  public newSaleForm: FormGroup = new FormGroup({
    clientId: new FormControl('', Validators.required),
    productSelector: new FormControl(''),
    products: new FormArray([]),
  });

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((query) => {
      if (query['quicksale']) {
        this.addOrderProduct({
          name: 'JBL',
          price: 4009000,
          stock: 991,
          created_at: '2023-03-15T02:45:17.328054+00:00',
          sku: '5458',
          id: 188,
          active: true,
          updated_at: '2023-03-30T02:41:08.100777+00:00',
        });
      }
    });

    this.apiService
      .getAllClients()
      .subscribe((clients: any[]) => (this.clients = clients));

    this.apiService
      .getAllProducts()
      .subscribe(
        (products: any[]) =>
          (this.products = products.filter(
            (e) => e.stock >= 1 && e.active == true
          ))
      );

    this.newSaleForm.valueChanges.subscribe((values) => {
      if (values.clientId) {
        this.filterClients(values.clientId);
      } else {
        this.filterClients();
      }

      if (values.productSelector) {
        this.filterProducts(values.productSelector);
      } else {
        this.filterProducts();
      }

      this.updateOrderTotal();
    });
  }

  public filterClients(criteria?: string): void {
    if (criteria) {
      this.clientsList = this.clients.filter((client) =>
        client.email.includes(criteria)
      );
    } else {
      this.clientsList = [];
    }
  }

  public filterProducts(criteria?: string): void {
    if (criteria) {
      this.productsList = this.products.filter((product) =>
        product.name.includes(criteria)
      );
    } else {
      this.productsList = [];
    }
  }

  public toggleClientSelector(): void {
    this.showClientSelector = !this.showClientSelector;
  }

  public toggleProductSelector(): void {
    this.showProductSelector = !this.showProductSelector;
  }

  get saleProducts(): FormArray {
    return this.newSaleForm.controls['products'] as FormArray;
  }

  public addOrderProduct(product: any): void {
    const newProduct: FormGroup = new FormGroup({
      productId: new FormControl(product.id, Validators.required),
      quantity: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(product.stock),
      ]),
      originalStock: new FormControl(product.stock),
      originalName: new FormControl(product.name),
      originalPrice: new FormControl(product.price),
    });

    this.saleProducts.push(newProduct);

    this.updateOrderTotal();
  }

  public increaseQuantity(control: any, formIndex: any): void {
    if (control.value.quantity < control.value.originalStock) {
      this.saleProducts.controls[formIndex].patchValue({
        quantity: control.value.quantity + 1,
      });

      this.updateOrderTotal();
    }
  }

  public decreaseQuantity(control: any, formIndex: any): void {
    if (control.value.quantity > 1) {
      this.saleProducts.controls[formIndex].patchValue({
        quantity: control.value.quantity - 1,
      });

      this.updateOrderTotal();
    }
  }

  public deleteSaleProduct(formIndex: number): void {
    this.saleProducts.removeAt(formIndex);

    this.updateOrderTotal();
  }

  public updateOrderTotal(): void {
    this.orderTotal = this.saleProducts.controls.reduce((acc, val) => {
      acc = acc + val.value.quantity * val.value.originalPrice;
      return acc;
    }, 0);
  }
}
