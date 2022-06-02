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
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
