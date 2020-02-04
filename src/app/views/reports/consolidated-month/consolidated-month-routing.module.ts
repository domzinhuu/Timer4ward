import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsolidatedMonthComponent } from './consolidated-month.component';

const routes: Routes = [
  {
    path: '',
    component: ConsolidatedMonthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsolidatedMonthRoutingModule {}
