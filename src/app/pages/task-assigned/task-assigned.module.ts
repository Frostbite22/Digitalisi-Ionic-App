import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskAssignedPageRoutingModule } from './task-assigned-routing.module';

import { TaskAssignedPage } from './task-assigned.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TaskAssignedPageRoutingModule
  ],
  declarations: [TaskAssignedPage]
})
export class TaskAssignedPageModule {}
