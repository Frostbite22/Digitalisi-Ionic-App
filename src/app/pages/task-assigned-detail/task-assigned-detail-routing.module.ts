import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskAssignedDetailPage } from './task-assigned-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TaskAssignedDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskAssignedDetailPageRoutingModule {}
