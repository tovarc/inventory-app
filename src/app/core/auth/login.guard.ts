import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { ApiService } from '../http/api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) {}

  public getAuth() {
    this.apiService.getAuth().subscribe({
      next: () => {},
      error: () => {
        this.router.navigateByUrl('/login');
        return false;
      },
      complete: () => true,
    });
  }

  canActivate(): any {
    this.getAuth();
  }

  canActivateChild(): any {
    this.getAuth();
  }
}
