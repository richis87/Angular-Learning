import { Component } from '@angular/core';

@Component({
  // nombre que le quiero dar a mi component
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  // Esta propiedad se puede utilizar en el html
  public title: string = 'Hola Mundo';


}
