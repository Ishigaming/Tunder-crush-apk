import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenderSelectionPageRoutingModule } from './gender-selection-routing.module';

import { GenderSelectionPage } from './gender-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenderSelectionPageRoutingModule
  ],
  declarations: [GenderSelectionPage]
})
export class GenderSelectionPageModule {}
