import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'dashboard-indicators',
  templateUrl: './indicators.component.html',
})
export class DashboardIndicatorsComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {}

  public openQuickSale(): void {
    this.router.navigate(['/dashboard/sales/new'], {
      queryParams: {
        quicksale: 1,
      },
    });
  }
}
