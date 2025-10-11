import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassionsPage } from './passions.page';

const routes: Routes = [
  {
    path: '',
    component: PassionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassionsPageRoutingModule {}
