import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecadeFilterPipe } from './decade-filter.pipe';



@NgModule({
  declarations: [DecadeFilterPipe],
  exports: [DecadeFilterPipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
