import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  public registerForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public get controls() {
    return this.registerForm.controls;
  }

  public register() {
    const url: string = 'https://api-sales-app.josetovar.dev/users';

    this.http.post(url, this.registerForm.value).subscribe((response) => {
      if (response) {
        this.router.navigate(['/login']);
      }
    });
  }
}
