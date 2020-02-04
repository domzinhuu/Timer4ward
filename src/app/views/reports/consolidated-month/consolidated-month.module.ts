import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsolidatedMonthRoutingModule } from './consolidated-month-routing.module';
import { ConsolidatedMonthComponent } from './consolidated-month.component';

@NgModule({
  declarations: [ConsolidatedMonthComponent],
  imports: [CommonModule, ConsolidatedMonthRoutingModule]
})
export class ConsolidatedMonthModule {}
