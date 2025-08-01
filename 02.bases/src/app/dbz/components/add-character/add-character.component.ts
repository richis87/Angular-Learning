import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from '../../inerfaces/character.interface';

@Component({
  selector: 'dbz-add-character',
  templateUrl: './add-character.component.html',
  styleUrl: './add-character.component.css',
})
export class AddCharacterComponent {

  @Output()
  public onNewCharacter: EventEmitter<Character>= new EventEmitter();

  public character: Character = {
    name: '',
    power:  0,
  }

  emitCharacter(){

  //  console.log(this.character);

    if ( this.character.name.length === 0) return;

    // console.log(this.character)

    this.onNewCharacter.emit({...this.character});

    this.character.name = '';
    this.character.power= 0;

    this.character = { name: '', power: 0 };

    // this.character.name= '';
    // this.character.power= 0;


  }

 }
