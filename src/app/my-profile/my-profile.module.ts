import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileImageUploadModule } from '../common/profile-image-upload/profile-image-upload.module';

const routes: Routes = [
  { path: '', component: MyProfileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProfileImageUploadModule
  ],
  declarations: [MyProfileComponent]
})
export class MyProfileModule { }
