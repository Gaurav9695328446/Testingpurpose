import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HamareNetajiKahenComponent } from './hamare-netaji-kahen.component';
import { SliderByScreenModule } from '../common/slider-by-screen/slider-by-screen.module';

import { SlideshowModule } from 'ng-simple-slideshow';


const routes: Routes = [
  { path: '', component: HamareNetajiKahenComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SlideshowModule,
    SliderByScreenModule
  ],
  declarations: [
    HamareNetajiKahenComponent
  ]
})
export class HamareNetajiKahenModule { }
