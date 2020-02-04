import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'consolidated-month',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ReportsComponent,
    children: [
      {
        path: 'consolidated-month',
        loadChildren: () =>
          import('./consolidated-month/consolidated-month.module').then(m => m.ConsolidatedMonthModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule {}
