import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessDetailsPageRoutingModule } from './process-details-routing.module';

import { ProcessDetailsPage } from './process-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcessDetailsPageRoutingModule
  ],
  declarations: [ProcessDetailsPage]
})
export class ProcessDetailsPageModule {}
