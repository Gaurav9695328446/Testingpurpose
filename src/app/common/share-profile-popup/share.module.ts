import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareProfilePopupComponent } from './share-profile-popup.component'; 

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ShareProfilePopupComponent],
  exports: [ShareProfilePopupComponent]
})
export class SharePopupModule { }
