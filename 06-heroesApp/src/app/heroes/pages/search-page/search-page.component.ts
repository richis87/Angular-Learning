import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  //FormControl es un formulario reactivo, hay que importar el modulo
  public searchInput = new FormControl('')
  public heroes:Hero[] = [];
  public selectedHero?:Hero;

  constructor(

    private heroeService: HeroesService

  ){ }


  searchHero(){
    const value: string = this.searchInput.value || ''

    console.log(value)

    this.heroeService.getSuggestions(value)
    .subscribe(heroes => this.heroes=heroes)

    console.log(this.heroes)

  }

  onSelectedOption( event: MatAutocompleteSelectedEvent ):void{
    console.log(event.option.value)

    if (!event.option.value){
      this.selectedHero = undefined
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue( hero.superhero );

    this.selectedHero = hero;

}

}
