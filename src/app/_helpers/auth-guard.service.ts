import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/_services';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      const curDate = JSON.parse(localStorage.getItem('token')).date;
      if (this.authenticationService.validateDate(curDate)) {
        return true;
      }
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['auth'], { queryParams: { path: 'login', returnUrl: state.url } });
    return false;
  }
}
