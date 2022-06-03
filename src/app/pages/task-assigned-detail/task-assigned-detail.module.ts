import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { TaskAssignedDetailPageRoutingModule } from './task-assigned-detail-routing.module';

import { TaskAssignedDetailPage } from './task-assigned-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskAssignedDetailPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [TaskAssignedDetailPage]
})
export class TaskAssignedDetailPageModule {}

