import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnniversaryComponent } from './anninversary.component';
import { RouterModule, Routes } from '@angular/router';
import { TabsModule, RatingModule, CollapseModule } from 'ngx-bootstrap';
import { SlideshowModule } from 'ng-simple-slideshow';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { SliderByScreenModule } from '../common/slider-by-screen/slider-by-screen.module';

const routes: Routes = [
  { path: '', component: AnniversaryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RatingModule.forRoot(),
    TabsModule,
    SlideshowModule,
    FormsModule,
    CoreModule,
    CollapseModule,
    SliderByScreenModule
  ],
  declarations: [AnniversaryComponent]
})
export class AnniversaryModule { }
