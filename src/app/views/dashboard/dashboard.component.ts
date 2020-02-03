import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CostCenterService } from 'src/app/services/costCenter/cost-center.service';
import { CostCenterModel } from 'src/app/models/cost-center.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  loggedUser$: Observable<UserModel>;
  costCenterList$: Observable<CostCenterModel[]>;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private ccService: CostCenterService
  ) {}

  ngOnInit() {
    this.ccService.updateCostCenterList();
    this.loggedUser$ = this.authService.userLogged$;
    this.costCenterList$ = this.ccService.costCenterList$;
  }

  public logout(): void {
    this.authService.logout();
  }
}
