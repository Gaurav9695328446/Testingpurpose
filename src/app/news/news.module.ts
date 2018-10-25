import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { SlideshowModule } from 'ng-simple-slideshow';
import { CoreModule } from '../core/core.module';
import { SliderByScreenModule } from '../common/slider-by-screen/slider-by-screen.module';



const routes: Routes = [
  { path: '', component: NewsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SlideshowModule,
    CoreModule,
    SliderByScreenModule
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
