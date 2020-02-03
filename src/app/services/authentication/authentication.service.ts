import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private subject = new BehaviorSubject(null);
  userLogged$: Observable<UserModel> = this.subject.asObservable();

  constructor(private httpClient: HttpClient, private jwtService: JwtHelperService, private router: Router) {}

  public login(email: string, password: string): Observable<UserModel> {
    return this.httpClient.post(environment.api_url + '/auth/login', { email, password }).pipe(
      map((res: any) => {
        const { token } = res;
        const payload = this.jwtService.decodeToken(token);
        const user: UserModel = payload;

        this.setSession(token, user);
        return user;
      })
    );
  }

  public forgotPassword(email: string): Observable<any> {
    const params = new HttpParams().append('email', email);
    return this.httpClient.get(environment.api_url + '/auth/forgot', { params });
  }

  public recoveryPassword(token: string, password: string): Observable<any> {
    const url = environment.api_url + '/auth/recovery/' + token;

    return this.httpClient.post(url, { password });
  }

  public logout(): void {
    this.clearSession();
    this.router.navigateByUrl('/login');
  }

  public renewSessionIfTokenIsValid(): boolean {
    const token = this.jwtService.tokenGetter();

    if (this.jwtService.isTokenExpired(token)) {
      return false;
    }

    const userPayload = this.jwtService.decodeToken(token);
    this.subject.next(userPayload);
    return true;
  }

  private clearSession(): void {
    localStorage.clear();
  }

  private setSession(token: string, userPayload: UserModel): void {
    localStorage.setItem('access_token', token);
    this.subject.next(userPayload);
  }
}
