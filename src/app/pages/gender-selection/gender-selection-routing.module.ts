import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenderSelectionPage } from './gender-selection.page';

const routes: Routes = [
  {
    path: '',
    component: GenderSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenderSelectionPageRoutingModule {}
