import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  //Puede que sea nulo en algún momento del tiempo
  public hero?:Hero;

  constructor(
    private heroService: HeroesService,
    //En este caso la ruta es id, según el archivo heroes-routing.module.ts
    private activatedRoute: ActivatedRoute,
    private router: Router

  ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) => this.heroService.getHeroeById( id ) ),
    ).subscribe( hero =>{
      if (!hero ) return this.router.navigate( [ '/heroes/list' ] )

      this.hero = hero
      // console.log({id})
      return;
    })
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list')
  }

}
