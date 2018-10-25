import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileImageUploadComponent } from './profile-image-upload.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProfileImageUploadComponent],
  exports: [ProfileImageUploadComponent]
})
export class ProfileImageUploadModule { }
