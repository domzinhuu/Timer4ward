import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './views/authentication/authentication.component';
import { RecoveryPasswordComponent } from './views/authentication/recover-password/recovery-password.component';
import { HeaderInterceptor } from './security/interceptor/header-interceptor.service';
import { HeaderModule } from './components/header/header.module';

@NgModule({
  declarations: [AppComponent, AuthenticationComponent, RecoveryPasswordComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HeaderModule,
    ToastrModule.forRoot({
      newestOnTop: true,
      timeOut: 3000,
      preventDuplicates: true,
      progressAnimation: 'decreasing',
      progressBar: true
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: [],
        blacklistedRoutes: [
          'localhost:3000/api/auth/login',
          'localhost:3000/api/auth/forget',
          'localhost:3000/api/auth/activate'
        ]
      }
    })
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule {}
