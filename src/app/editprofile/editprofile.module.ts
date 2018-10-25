import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProfileComponent } from './editprofile.component';
import {RouterModule, Routes} from '@angular/router';
import { TabsModule} from 'ngx-bootstrap';

const routes: Routes = [
  { path: '', component: EditProfileComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TabsModule
  ],
  declarations: [EditProfileComponent]
})
export class EditProfileModule { }
