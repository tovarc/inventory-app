import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSaleFormComponent } from './components/create-sale-form/create-sale-form.component';
import { DashboardIndicatorsComponent } from './components/indicators/indicators.component';
import { SalesTableComponent } from './components/sales-table/sales-table.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { ProductsComponent } from './pages/products/products.component';
import { SalesComponent } from './pages/sales/sales.component';
import { DashboardComponent } from './root/dashboard/dashboard.component';
import { LoginGuard } from 'src/app/core/auth/login.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [LoginGuard],
    children: [
      {
        path: '',
        component: DashboardIndicatorsComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'clients',
        component: ClientsComponent,
      },
      {
        path: 'sales',
        component: SalesComponent,
        children: [
          {
            path: '',
            component: SalesTableComponent,
          },
          {
            path: 'new',
            component: CreateSaleFormComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
