import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PassionsPageRoutingModule } from './passions-routing.module';

import { PassionsPage } from './passions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PassionsPageRoutingModule
  ],
  declarations: [PassionsPage]
})
export class PassionsPageModule {}
