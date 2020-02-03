import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeInfoRoutingModule } from './home-info-routing.module';
import { HomeInfoComponent } from './home-info.component';
import { LaunchTableModule } from 'src/app/components/launch-table/launch-table.module';

@NgModule({
  declarations: [HomeInfoComponent],
  imports: [CommonModule, HomeInfoRoutingModule, LaunchTableModule,]
})
export class HomeInfoModule {}
