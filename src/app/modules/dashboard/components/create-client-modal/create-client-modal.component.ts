import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/http/api.service';

@Component({
  selector: 'create-client-modal',
  templateUrl: './create-client-modal.component.html',
})
export class CreateClientModalComponent implements OnInit {
  constructor(private readonly apiService: ApiService) {}

  @Output() closeCreateClientModal = new EventEmitter<boolean>();

  public clientForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, Validators.required),
    last_name: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
    phone: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {}

  public createClient(): void {
    this.apiService.createClient(this.clientForm.value).subscribe({
      complete: () => {
        this.closeModal();
      },
    });

    console.log(this.clientForm.value);
  }

  public closeModal(): void {
    this.closeCreateClientModal.emit();
  }
}
