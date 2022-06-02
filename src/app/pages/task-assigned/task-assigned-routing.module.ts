import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskAssignedPage } from './task-assigned.page';

const routes: Routes = [
  {
    path: '',
    component: TaskAssignedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskAssignedPageRoutingModule {}
