import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpcomingElectionsComponent } from './upcoming-elections.component';
import { RouterModule, Routes } from '@angular/router';
import { SliderByScreenModule } from '../common/slider-by-screen/slider-by-screen.module';

const routes: Routes = [
  { path: '', component: UpcomingElectionsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SliderByScreenModule
  ],
  declarations: [UpcomingElectionsComponent]
})
export class UpcomingElelectionsModule { }
