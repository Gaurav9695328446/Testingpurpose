import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLeaderProfileComponent } from './my-leader-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { ProfileImageUploadModule } from '../common/profile-image-upload/profile-image-upload.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap';

const routes: Routes = [
  { path: '', component: MyLeaderProfileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ProfileImageUploadModule,
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule
  ],
  declarations: [MyLeaderProfileComponent]
})
export class MyLeaderProfileModule { }
