import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';
import { HeaderModule } from 'src/app/components/header/header.module';

@NgModule({
  declarations: [ReportsComponent],
  imports: [CommonModule, ReportsRoutingModule, HeaderModule]
})
export class ReportsModule {}
