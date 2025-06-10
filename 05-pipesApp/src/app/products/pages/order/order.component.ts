import { Component } from '@angular/core';
import { Color, Hero } from '../../interfaces/hero.interface';
import { Casa, Colores } from '../../interfaces/casa.interface';

@Component({
  selector: 'products-order',
  templateUrl: './order.component.html',
  styles: ``
})
export class OrderComponent {

  public isUperCase: boolean = false;
  public orderBy?: keyof Hero;

  public heroes: Hero[] = [
    {
      name: 'Superman',
      canFly: true,
      color: Color.blue,
    },
    {
      name: 'Batman',
      canFly: false,
      color: Color.black,
    },
    {
      name: 'Daredevil',
      canFly: false,
      color: Color.red,
    },
    {
      name: 'Roin',
      canFly: false,
      color: Color.red,
    },
    {
      name: 'Linterna Verde',
      canFly: true,
      color: Color.green,
    }
  ]

  toggleUperCase():void{
    this.isUperCase = !this.isUperCase;
  }

  changeOrder( value: keyof Hero ){
    this.orderBy = value;
  }

  public casaAlquilads: Casa[] = [
    {
      puertas: 'dos',
      color: Colores.rojo,
      propietario:'Humber',
      techo: 'amarillo'
    },

  ]





}
