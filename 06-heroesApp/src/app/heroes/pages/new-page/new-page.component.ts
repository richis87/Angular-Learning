import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { FormControl, FormGroup, ValueChangeEvent } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  // Formulario reactivo
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  })

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvels Comics', desc: 'Marvels - Comics' },
  ];

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if ( !this.router.url.includes('edit') ) return;

    this.activateRoute.params
    .pipe(
      switchMap( ({ id }) => this.heroesService.getHeroeById(id) ),
    ).subscribe( hero=> {
      if ( !hero ) return this.router.navigateByUrl('/');

      this.heroForm.reset(hero);

      return;


    })
  }

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit(): void {
    // console.log({
    //   formIsValid: this.heroForm.valid,
    //   value:this.heroForm.value,
    //})

    if (this.heroForm.invalid) return

    if (this.currentHero.id) {
      console.log('update')
      this.heroesService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackbar(`${hero.superhero} updated!`)
        });
      return
    }

    this.heroesService.addHero(this.currentHero)
    .subscribe(hero => {
      this.router.navigate(['/heroes/edit/', hero.id])
      this.showSnackbar(`${hero.superhero} created!`)
    })

  }

  onDeleteHero(){
    if ( !this.currentHero ) throw Error ('Hero id is required');

    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
     data: this.heroForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      filter( (result:boolean) => result ),
      switchMap( () => this.heroesService.deleteHeroById( this.currentHero.id ) ),
      filter( (wasDeleted:boolean)  => wasDeleted),
      // tap( result => console.log(result) )
    )
    .subscribe(result => {
      this.router.navigate(['/heroes']);

    // dialogRef.afterClosed().subscribe(result => {
    //   if ( !result ) return

    //   this.heroesService.deleteHeroById( this.currentHero.id )
    //   .subscribe( wasDeleted => {
    //     this.router.navigate(['/heroes']);
    //   });
    // });

  })
}

  // this.heroesService.updateHero( this.heroForm.value )

  showSnackbar( message: string) :void{
    this.snackbar.open(message,'done',{
      duration:2500,
    })
  }

}


