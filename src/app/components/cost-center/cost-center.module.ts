import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CostCenterComponent } from './cost-center.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CostCenterComponent],
  exports: [CostCenterComponent],
  imports: [CommonModule, FormsModule]
})
export class CostCenterModule {}
