import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from './fake-users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private readonly router: Router) {}

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  public showMe: boolean = false;

  ngOnInit(): void {}

  public login() {
    const { email, password } = this.loginForm.value;

    Users.map((user) => {
      if (user.email === email && user.password === password) {
        localStorage.setItem('loggedIn', 'true');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  public sayHi() {
    console.log('Hello!');
  }

  ngOnDestroy(): void {
    console.log('My component has been close or destroyed');
  }
}
