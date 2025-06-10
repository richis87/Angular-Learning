import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { isInteropObservable } from 'rxjs/internal/util/isInteropObservable';

const rtx55090 = {
  name:'RTX 5090',
  price: 2500,
  inStorage: 6,

}


@Component({
  templateUrl: './basic-page.component.html',
  styles: ``
})



export class BasicPageComponent implements OnInit {

  ngOnInit(): void {
    // this.myForm.reset( rtx55090 )
  }

  isInvalidField( field:string ): boolean|null{
    return this.myForm.controls[field].errors
    && this.myForm.controls[field].touched
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


public myForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(3)]),
    price: new FormControl(0,[Validators.required,Validators.min(0)]),
    inStorage: new FormControl(0,[Validators.required,Validators.min(0)])

  })

  // constructor( private fb: FormBuilder ){}

  // public myForm: FormGroup =  this.fb.group({
  //   name:[''],
  //   price: [0],
  //   inStorage:[0],
  // })

  onSave():void{
    if ( this.myForm.invalid )
      this.myForm.markAllAsTouched();
      return;

    console.log(this.myForm.value)

    // No es requirido hacer el reset para el valor string porque se hace de forma automática
    this.myForm.reset({
      price: 0,
      inStorage: 0
    })

  }

}
