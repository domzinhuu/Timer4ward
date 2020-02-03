import { Component, OnInit } from '@angular/core';
import { CostCenterModel } from 'src/app/models/cost-center.model';
import { Observable } from 'rxjs';
import { CostCenterService } from 'src/app/services/costCenter/cost-center.service';

@Component({
  selector: 'app-home-info',
  templateUrl: './home-info.component.html',
  styleUrls: ['./home-info.component.scss']
})
export class HomeInfoComponent implements OnInit {
  costCenterList$: Observable<CostCenterModel[]>;
  constructor(private ccService: CostCenterService) {}

  ngOnInit() {
    this.costCenterList$ = this.ccService.costCenterList$;
  }
}
