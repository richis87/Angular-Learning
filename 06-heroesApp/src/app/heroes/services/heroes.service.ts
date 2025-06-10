import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }


  getHeroeById( id: string ):Observable<Hero|undefined>{
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${ id }`)
    .pipe(
      delay(1000),
      //Retorna un observable que va a ser un undefined. El of es para indicar que es un observable
      catchError( error => of (undefined) )
    )
  }

  getSuggestions(query: string): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=3`)
  }

  addHero( hero:Hero):Observable<Hero>{

    let heroService = {
      "superhero": hero.superhero,
      "publisher": hero.publisher,
      "alter_ego": hero.alter_ego,
      "first_appearance": hero.first_appearance,
      "characters": hero.characters,
      "alt_img": hero.alt_img
    }

    return this.http.post<Hero>(`${this.baseUrl}/heroes`,heroService)
  }

  updateHero( hero:Hero):Observable<Hero>{
    if( !hero.id ) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`,hero)
  }
  
  deleteHeroById( id:string ):Observable<boolean>{
    if( !id ) throw Error('Hero id is required');
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
    .pipe(
      map( resp => true ),
      catchError( err => of (false) ),
    );
  }

}
