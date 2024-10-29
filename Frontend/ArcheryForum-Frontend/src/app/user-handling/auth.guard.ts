import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private apiService: ApiService, private router: Router) {}

  is_superuser!: boolean;
  is_authenticated!: boolean;

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const requiredRole = route.data['role'];

    // get first vlaue of the observable and then close
    const user = await firstValueFrom(this.apiService.current_user());
    const auth = await firstValueFrom(this.apiService.is_authenticated());

    this.is_superuser = user.is_superuser;
    this.is_authenticated = auth.authenticated;

    if (this.is_authenticated) {
      if (requiredRole) {
        if (this.is_superuser) {
          return true
        } else {
          window.alert('You must be Admin to perform this action!')
          return false
        }
      } else {
        return true
      }
    } else {
      window.alert('You have to log in to perform this action!')
      this.router.navigate(['/login']);
      return false;
    }
  }
}
