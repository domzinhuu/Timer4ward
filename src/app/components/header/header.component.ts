import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'tf-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() username: string;

  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}

  public logout(): void {
    this.authService.logout();
  }
}
