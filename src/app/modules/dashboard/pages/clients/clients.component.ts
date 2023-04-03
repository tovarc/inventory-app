import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'app-dashboard-clients',
  templateUrl: './clients.component.html',
})
export class ClientsComponent implements OnInit {
  constructor(private readonly apiService: ApiService) {}

  public client!: any;
  public clients$!: Observable<any>;
  public page: number = 1;
  public rowsPerPage: number = 10;

  public showUpdateClientModal: boolean = false;
  public showCreateClientModal: boolean = false;

  public changePage(page: number) {
    this.page = page;
  }

  ngOnInit(): void {
    this.clients$ = this.apiService.getAllClients();
  }

  public searchClient(criteria: string): void {
    if (criteria) {
      this.clients$ = this.apiService.getAllClients().pipe(
        map((clients) => {
          return clients.filter(
            (client: any) =>
              client.first_name
                .toLowerCase()
                .includes(criteria.toLowerCase()) ||
              client.last_name.toLowerCase().includes(criteria.toLowerCase())
          );
        })
      );
    } else {
      this.clients$ = this.apiService.getAllClients();
    }
  }

  public openCreateClientModal(): void {
    this.showCreateClientModal = true;
  }

  public closeCreateClientModal(): void {
    this.showCreateClientModal = false;
  }

  public openUpdateClientModal(client: any): void {
    this.client = client;
    this.showUpdateClientModal = true;
  }

  public closeUpdateClientModal(): void {
    this.showUpdateClientModal = false;
  }
}
