import { SearchResponse } from './../interfaces/gifs.interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif } from '../interfaces/gifs.interfaces';


// const GIPHY_APY_KEY= 'EBXSW7x3pjmwgI3sL60fLwk2XVVxSgn3'

// cuando se usa root, se hace visible para toda la aplicación, sin necesidad de estar exportandolo
@Injectable({ providedIn: 'root' })
export class GifsService {

  public gifList:Gif[]= [];

  private _tagsHistory: string[] = [];
  private apiKey:     string = 'EBXSW7x3pjmwgI3sL60fLwk2XVVxSgn3';
  private serviceUrl: string = 'http://api.giphy.com/v1/gifs'

  constructor(
    // Esto se hace gracias a la importación de Http en app.module
    private http: HttpClient
  ) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLocaleLowerCase();

    //Eliminar el tag duplicado
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldtag) => oldtag !== tag);
    }

    // Agregar tag al inicio
    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage()
  }

  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory))
  }

  private loadLocalStorage():void{

   if (!localStorage.getItem('history')) return
      this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

      if (this._tagsHistory.length === 0) return

      this.searchTag(this._tagsHistory[0])

  }

  public  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit','10')
    .set('q',tag)


    this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
    .subscribe( resp => {
      // console.log(resp.data)

      this.gifList=resp.data;

      // console.log({gifs: this.gifList})

    })


    // fetch('http://api.giphy.com/v1/gifs/search?api_key=EBXSW7x3pjmwgI3sL60fLwk2XVVxSgn3&q=valorant&limit=10')
    // .then( resp => resp.json() )
    // .then( data => console.log(data));
  }
}
