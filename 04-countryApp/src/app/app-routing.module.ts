import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { AboutPageComponent } from './shared/pages/about-page/about-page.component';
import { ContactPageComponent } from './shared/pages/contact-page/contact-page.component';

const routes: Routes =[
  // {
  //   path: '',
  //   component: HomePageComponent
  // },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'contact',
    component: ContactPageComponent
  },
  {
    path: 'countries',
    loadChildren: () => import('./countries/countries.module')
    .then ( m => m.CountriesModule )
  },
  {
    path: '**',
    redirectTo: 'countries'
  },
]

@NgModule({
  imports:[
    RouterModule.forRoot(routes), // forRoot se pone cuando el módulo está en la raíz del proyecto
  ],
  exports:[
    RouterModule
  ]
})

export class AppRoutingModule { }
