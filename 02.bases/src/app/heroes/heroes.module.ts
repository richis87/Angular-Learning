import { CommonModule } from '@angular/common';

import { ListComponent } from './components/list/list.component';
import { HeroComponent } from './components/hero/hero.component';
import { NgModule } from "@angular/core";

@NgModule({
  declarations:[
    ListComponent,
    HeroComponent,
  ],
  exports:[
    ListComponent,
    HeroComponent
  ],
  imports:[
    CommonModule //Esto se importa para que se puedan utilizar las directias
  ]
})
export class HeroesModule{}
