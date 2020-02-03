import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  constructor(private jwt: JwtHelperService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.jwt.tokenGetter();

    if (this.isWhitelist(req.url)) {
      return next.handle(req);
    }

    let headers = req.headers.set('Content-Type', 'application/json');
    headers = headers.append('Authorization', `Bearer ${token}`);
    const authReq = req.clone({ headers });
    return next.handle(authReq);
  }

  private isWhitelist(requestUrl: string): boolean {
    const whiteList = ['/auth/login', '/auth/activated', '/auth/forgot'];
    let openedRouter = false;

    whiteList.forEach(item => {
      const regex = new RegExp(item);
      openedRouter = regex.test(requestUrl);
    });

    return openedRouter;
  }
}
