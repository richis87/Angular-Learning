import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb          = inject( FormBuilder );
  private authService = inject (AuthService);
  private router      = inject (Router); //Para hacer la navegación

  public myForm: FormGroup = this.fb.group({
    email:['richardzu10@hotmail.com',[Validators.required, Validators.email]],
    password:['123456',[Validators.required, Validators.minLength(6)]],
  });

  login(){
    console.log(this.myForm.value)
    const {email, password} = this.myForm.value
    this.authService.login(email, password)
    .subscribe({
      // next: () => console.log('Todo bien'),
      // next: () =>  Swal.fire({
      //   title: "Good job!",
      //   text: "Ingreso correcto",
      //   icon: "success"
      // }),
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (error) => {
        console.log({loginError: error});
        Swal.fire({
          title: "Oops...",
          text: error,
          icon: "error"
        })
      }
    })
    // .subscribe( success => {
      // console.log({success});
    // })
  }

}
