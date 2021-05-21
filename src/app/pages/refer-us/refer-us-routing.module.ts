import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReferUsPage } from './refer-us.page';

const routes: Routes = [
  {
    path: '',
    component: ReferUsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferUsPageRoutingModule {}
