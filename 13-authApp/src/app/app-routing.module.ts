
import { NgModule} from '@angular/core'
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './auth/guards';


export const routes: Routes = [

  {
    path: 'auth',
    //guards
    canActivate:[isNotAuthenticatedGuard],
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    //guards
    canActivate: [isAuthenticatedGuard],
    loadChildren:() => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: '**',
    //guards
    redirectTo: 'auth'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}

