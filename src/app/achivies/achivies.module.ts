import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AchiviesComponent } from './achivies.component';
import { RouterModule, Routes } from '@angular/router';
import { SliderByScreenModule } from '../common/slider-by-screen/slider-by-screen.module';

const routes: Routes = [
  { path: '', component: AchiviesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SliderByScreenModule
  ],
  declarations: [AchiviesComponent]
})
export class AchiviesModule { }
