import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProcessDetailsPageRoutingModule } from './process-details-routing.module';

import { ProcessDetailsPage } from './process-details.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProcessDetailsPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [ProcessDetailsPage]
})
export class ProcessDetailsPageModule {}
