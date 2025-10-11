import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImgprofilePage } from './imgprofile.page';

const routes: Routes = [
  {
    path: '',
    component: ImgprofilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImgprofilePageRoutingModule {}
