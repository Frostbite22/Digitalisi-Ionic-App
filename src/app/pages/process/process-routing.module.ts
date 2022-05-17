import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessGuard } from 'src/app/guards/process.guard';

import { ProcessPage } from './process.page';

const routes: Routes = [
  {
    path: '',
    component: ProcessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProcessPageRoutingModule {}
