import { Component } from '@angular/core';
import { ValueChangeEvent } from '@angular/forms';
import { Observable, generate, interval, tap } from 'rxjs';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styleUrl: './uncommon-page.component.css'
})
export class UncommonPageComponent {

  // i18n Select
  public name:string = 'Richard';
  public gender:'male'|'female' = 'male';

  public invitacionMap={
    male:'invitarlo',
    female:'invitarla',
  }

  changeClient(){
    this.name='Irene';
    this.gender='female';
  }

  //i18n Plural
  public clientes: string[]=['Maria','Juan','Hugo','Jose','Manuel','Alberto','Richard','Mario','Marcos']
  public clientesMap = {
    '=0':'no tenemos ningún cliente esperando.',
    '=1':'tenemos un cliente esperando.',
    '=2':'tenemos 2 personas esperando.',
    'other':'tenemos # clientes esperando.',
  }

  deleteClient():void{
    //shift elimina el primer elemento
    this.clientes.shift();
  }

  // KeyValue Pipe
  public person ={
    name: 'Richard',
    age:36,
    address:'San Diego de Tres Ríos',
  }

  //Async Pipe
  public myObservableimer:Observable<number> = interval(2000).pipe(
    tap( value => console.log('tap:',value) )
  );

  public promiseValue:Promise<string> = new Promise( (resolve, reject) =>{
    setTimeout(()=>{
      resolve('Tenemos data en la  promesa');
      console.log('Tenemos data en la  promesa');
      this.person.name = 'Alberto'
    },3500)
  });

}
