import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProcessDetailsPage } from './process-details.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessDetailsPageRoutingModule {}
