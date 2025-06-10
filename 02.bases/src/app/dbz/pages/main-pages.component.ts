import { Component } from '@angular/core';
import { DbzService } from '../services/dbz.service';
import { Character } from '../inerfaces/character.interface';

@Component({
  selector: 'app-dbz-main-page',
  templateUrl: './main-pages.component.html'
})

export class MainPageComponent {

  constructor(
    private dbzService: DbzService
  ){}

  get characters(): Character[]{
    return [...this.dbzService.characters];
  }

  onDeleteCharacter(id: string):void{
    this.dbzService.DeleteCharacterById(id)
  }

  onNewCharacter(character: Character){
    this.dbzService.addCharacter(character);
  }

}
