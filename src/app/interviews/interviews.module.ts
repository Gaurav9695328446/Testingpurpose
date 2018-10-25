import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { InterviewsComponent } from './interviews.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { CoreModule } from '../core/core.module';
import { SliderByScreenModule } from '../common/slider-by-screen/slider-by-screen.module';


const routes: Routes = [
  { path: '', component: InterviewsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SlideshowModule,
    CoreModule,
     SliderByScreenModule
  ],
  declarations: [InterviewsComponent]
})
export class InterviewsModule { }
