import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { ProcessGuard } from './guards/process.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'process',
    canActivate: [ProcessGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: () => import('./pages/process/process.module').then( m => m.ProcessPageModule)
  },
  {
    path: 'process/:id',
    canActivate: [ProcessGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: () => import('./pages/process-details/process-details.module').then( m => m.ProcessDetailsPageModule)
  },
  {
    path: 'profile',
    canActivate: [ProcessGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'task',
    canActivate: [ProcessGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: () => import('./pages/task/task.module').then( m => m.TaskPageModule)
  },
  {
    path: 'task/:id',
    canActivate: [ProcessGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: () => import('./pages/task-detail/task-detail.module').then( m => m.TaskDetailPageModule)
  },
  {
    path: 'task-assigned',
    canActivate: [ProcessGuard],
    runGuardsAndResolvers: 'always',
    loadChildren: () => import('./pages/task-assigned/task-assigned.module').then( m => m.TaskAssignedPageModule)
  },
  {
    path: 'task-assigned/:id',
    loadChildren: () => import('./pages/task-assigned-detail/task-assigned-detail.module').then( m => m.TaskAssignedDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
