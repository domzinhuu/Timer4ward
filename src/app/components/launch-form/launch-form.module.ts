import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LaunchFormComponent } from './launch-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LaunchFormComponent],
  exports: [LaunchFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class LaunchFormModule {}
