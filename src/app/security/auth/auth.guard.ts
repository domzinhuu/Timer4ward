import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastHelperService } from 'src/app/services/toast-helper/toast-helper.service';
import { ToastType } from 'src/app/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private toast: ToastHelperService, private router: Router, private jwt: JwtHelperService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = this.jwt.tokenGetter();

    if (this.jwt.isTokenExpired(token)) {
      this.toast.show(ToastType.WARNING, 'Faça login novamente.', 'Sessão expirada');
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
