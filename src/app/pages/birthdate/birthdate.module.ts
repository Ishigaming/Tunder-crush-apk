import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BirthdatePageRoutingModule } from './birthdate-routing.module';

import { BirthdatePage } from './birthdate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BirthdatePageRoutingModule
  ],
  declarations: [BirthdatePage]
})
export class BirthdatePageModule {}
