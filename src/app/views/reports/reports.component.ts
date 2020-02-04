import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  loggedUser$: Observable<UserModel>;

  constructor(private router: Router, private authService: AuthenticationService) {}

  ngOnInit() {}
}
