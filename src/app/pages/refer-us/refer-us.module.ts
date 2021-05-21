import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferUsPageRoutingModule } from './refer-us-routing.module';

import { ReferUsPage } from './refer-us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReferUsPageRoutingModule
  ],
  declarations: [ReferUsPage]
})
export class ReferUsPageModule {}
