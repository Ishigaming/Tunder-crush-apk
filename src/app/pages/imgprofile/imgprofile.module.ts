import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImgprofilePageRoutingModule } from './imgprofile-routing.module';

import { ImgprofilePage } from './imgprofile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImgprofilePageRoutingModule
  ],
  declarations: [ImgprofilePage]
})
export class ImgprofilePageModule {}
