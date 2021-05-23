import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookSlotPage } from './book-slot.page';

const routes: Routes = [
  {
    path: '',
    component: BookSlotPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookSlotPageRoutingModule {}
