import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderModule } from 'src/app/components/header/header.module';
import { LaunchFormModule } from 'src/app/components/launch-form/launch-form.module';
import { PerCostCenterPieModule } from 'src/app/components/per-cost-center-pie/per-cost-center-pie.module';
import { CostCenterModule } from 'src/app/components/cost-center/cost-center.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeaderModule,
    LaunchFormModule,
    PerCostCenterPieModule,
    CostCenterModule
  ]
})
export class DashboardModule {}
