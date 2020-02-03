import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchTableComponent } from './launch-table.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LaunchTableComponent],
  exports: [LaunchTableComponent],
  imports: [CommonModule, FormsModule]
})
export class LaunchTableModule {}
