import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

 public HeroNames: string[] =
 [
  'Spiderman','Hulk','Ironman','She Hulk','Thor'
 ]

 public deletedHero?: string;

 removeLastHero():void{
  this.deletedHero = this.HeroNames.pop()
 }

}
