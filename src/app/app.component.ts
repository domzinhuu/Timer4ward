import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'timer4ward';
  constructor(private loginService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.checkIfIsLogged();
  }

  private checkIfIsLogged(): void {
    const isLogged: boolean = this.loginService.renewSessionIfTokenIsValid();

    if (isLogged) {
      this.router.navigateByUrl('/dashboard/home/info');
    }
  }
}
