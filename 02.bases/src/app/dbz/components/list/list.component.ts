import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../../inerfaces/character.interface';

@Component({
  selector: 'dbz-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {

  @Output()
  public onDeleteId: EventEmitter<string>= new EventEmitter();

  @Input() //Con esto se puede pasar variables entre padre e hijo
  public characterList: Character[] = [{
    name: 'Trunks',
    power: 10
  }]


  // onDeleteCharacter(index: number):void{
  //  // console.log(index)
  //  this.onDeleteId.emit(index);

  // }

  onDeleteCharacterById(id?: string):void{
    // console.log(index)

    if (!id) return;

    this.onDeleteId.emit(id);

   }

}
