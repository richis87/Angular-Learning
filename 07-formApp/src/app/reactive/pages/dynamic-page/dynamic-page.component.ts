import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {
  public myForm: FormGroup;

  public newFavorite: FormControl = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder
  ) {

    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      favoriteGames: this.fb.array([
        ['Metal Gear',Validators.required],
        ['Death Stranding',Validators.required],
        ['Medal of Honor',Validators.required],
        ['Impossible mission',Validators.required],

      ])
    });
  }

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray
  }

  isInvalidField( field:string ): boolean|null{
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
  }

  isInvalidFieldInArray(formArray:FormArray, index: number){
    return formArray.controls[index].errors
    && formArray.controls[index].touched

  }

  getFieldError( field:string ):string|null{

    if ( !this.myForm.controls[field] ) return null;

    // Pone {} si el valor viene nulo
    const errors = this.myForm.controls[field].errors || {};

    for (const key of Object.keys(errors)){
      // console.log(key)
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength } caracteres.`;
      }
    }

    return null;

  }



  onSubmit():void{

    if (this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([])
    this.myForm.reset();
  }

  onDeleteFavorite(index: number):void{
    this.favoriteGames.removeAt(index);
  }


  onAddToFavorites():void{
    if ( this.newFavorite.invalid ) return

    const newGame = this.newFavorite.value;

    // Forma sin FormBuilder
    // this.favoriteGames.push(new FormControl (newGame,Validators.required))

    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required )
    )


    this.newFavorite.reset();

    // console.log(this.newFavorite.value)
  }


}
