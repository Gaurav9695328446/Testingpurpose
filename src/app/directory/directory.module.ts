import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirectoryComponent } from './directory.component';
import { RouterModule, Routes } from '@angular/router';
import { SliderByScreenModule } from '../common/slider-by-screen/slider-by-screen.module';

const routes: Routes = [
  { path: '', component: DirectoryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SliderByScreenModule
  ],
  declarations: [DirectoryComponent]
})
export class DirectoryModule { }
