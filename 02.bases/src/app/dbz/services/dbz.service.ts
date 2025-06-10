
import { Injectable } from '@angular/core';
import { Character } from '../inerfaces/character.interface';
import { v4 as uuid} from "uuid";

@Injectable({
  providedIn: 'root' //Esto provoca que se haga un singleton en toda la aplicación y no hay que agregarlo en providers
})
export class DbzService {


  public characters:Character[] =[{
    id: uuid(),
    name: 'Krillin',
    power: 1000
  },{
    id: uuid(),
    name: 'Goku',
    power: 9500
  },{
    id: uuid(),
    name: 'Vegeta',
    power: 7500
  }];

  addCharacter( character: Character ):void{
    // console.log(character);

    // Se inserta al inicio
    // this.characters.unshift(character)

    // Se inserta al final
    const newCharacter: Character={
      id: uuid(),
      ...character
    };


    this.characters.push(newCharacter);

  }

  // onDeleteCharacterPage(index: number):void{
  //   // console.log(index);
  //   this.characters.splice(index,1);
  // }

  DeleteCharacterById(id: string):void{
    // console.log(index);
    this.characters = this.characters.filter( character => character.id != id )
  }


}
