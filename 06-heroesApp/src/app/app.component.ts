import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'heroesApp';

  // constructor(private AuthService:AuthService){


  // }
  // ngOnInit(): void {
  //   this.AuthService.chekAuthentication().subscribe( () => {
  //     console.log('checkAuthentication')
  //   } )
  // }

}
