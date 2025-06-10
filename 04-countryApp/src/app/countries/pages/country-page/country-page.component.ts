import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: [

  ]
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor (

   private activatedRoute: ActivatedRoute,
   private router: Router,
   private countryService: CountryService,


  ) {}

  ngOnInit(): void {
    //Obtiene el id del URL. id está definido en la ruta
    this.activatedRoute.params
    .pipe(
      switchMap( ({ id }) =>  this.countryService.searchCountryByAlphaCode( id )), //recibe el valor anterior y regresa un nuevo observable
    )
    .subscribe(( country ) => {
        // console.log(country);
        if (!country ) return this.router.navigateByUrl('')
         return this.country = country;
        // console.log('TENEMOS UN PAIS');
      });
  }

}
