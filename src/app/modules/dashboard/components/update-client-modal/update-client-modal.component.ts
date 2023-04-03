import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'update-client-modal',
  templateUrl: './update-client-modal.component.html',
})
export class UpdateClientModalComponent implements OnInit {
  constructor(private readonly apiService: ApiService) {}

  @Input() client: any;
  @Output() closeUpdateClientModal = new EventEmitter<boolean>();

  public clientForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    first_name: new FormControl(null),
    last_name: new FormControl(null),
    address: new FormControl(null),
    city: new FormControl(null),
    state: new FormControl(null),
    country: new FormControl(null),
    phone: new FormControl(null),
    email: new FormControl(null),
  });

  ngOnInit(): void {
    this.clientForm.setValue(this.client);
  }

  public updateClient(): void {
    this.apiService.updateClient(this.clientForm.value).subscribe({
      complete: () => {
        this.closeModal();
      },
    });
  }

  public closeModal(): void {
    this.closeUpdateClientModal.emit();
  }
}
