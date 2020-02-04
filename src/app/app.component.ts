import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'timer4ward';
  loggedUser$: Observable<UserModel>;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.checkIfIsLogged();
    this.loggedUser$ = this.authService.userLogged$;
  }

  private checkIfIsLogged(): void {
    const isLogged: boolean = this.authService.renewSessionIfTokenIsValid();

    if (isLogged) {
      this.router.navigateByUrl('/dashboard');
    }
  }
}
