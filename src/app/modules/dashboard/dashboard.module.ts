import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateClientModalComponent } from './components/create-client-modal/create-client-modal.component';
import { CreateSaleFormComponent } from './components/create-sale-form/create-sale-form.component';
import { DashboardIndicatorsComponent } from './components/indicators/indicators.component';
import { SalesTableComponent } from './components/sales-table/sales-table.component';
import { UpdateClientModalComponent } from './components/update-client-modal/update-client-modal.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ClientsComponent } from './pages/clients/clients.component';
import { ProductsComponent } from './pages/products/products.component';
import { SalesComponent } from './pages/sales/sales.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PaginationPipe } from './pagination/pagination.pipe';
import { DashboardComponent } from './root/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductsComponent,
    ClientsComponent,
    SalesComponent,
    PaginationComponent,
    PaginationPipe,
    CreateClientModalComponent,
    UpdateClientModalComponent,
    CreateSaleFormComponent,
    SalesTableComponent,
    DashboardIndicatorsComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, DashboardRoutingModule],
  providers: [],
})
export class DashboardModule {}
