import { Component, OnInit } from '@angular/core';
import { CostCenterModel } from 'src/app/models/cost-center.model';
import { Observable } from 'rxjs';
import { CostCenterService } from 'src/app/services/costCenter/cost-center.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-home-info',
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.scss']
})
export class HomeInfoComponent implements OnInit {
  costCenterList$: Observable<CostCenterModel[]>;
  loggedUser$: Observable<UserModel>;

  constructor(private ccService: CostCenterService, private authService: AuthenticationService) {}

  ngOnInit() {
    this.costCenterList$ = this.ccService.costCenterList$;
    this.loggedUser$ = this.authService.userLogged$;
  }
}
