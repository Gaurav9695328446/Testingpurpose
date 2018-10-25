import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideshowModule } from 'ng-simple-slideshow';

@NgModule({
  imports: [
    CommonModule,
    SlideshowModule
  ],
  exports: [
    SlideshowModule
  ],
  declarations: []
})
export class PublicModule { }
