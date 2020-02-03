import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerCostCenterPieComponent } from './per-cost-center-pie.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [PerCostCenterPieComponent],
  exports: [PerCostCenterPieComponent],
  imports: [CommonModule, ChartsModule]
})
export class PerCostCenterPieModule {}
