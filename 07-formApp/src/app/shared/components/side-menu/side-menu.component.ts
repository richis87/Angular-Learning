import { Component } from '@angular/core';

interface MenuItem {
  title: string,
  route: string,
}

@Component({
  selector: 'shared-side-menu',
  templateUrl: './side-menu.component.html',
  styles: ``
})
export class SideMenuComponent {

  public reactiveNenu: MenuItem[] = [
    { title: 'Basicos', route: './reactive/basic' },
    { title: 'Dinámicos', route: './reactive/dynamic' },
    { title: 'Switches', route: './reactive/switches' },
  ]

  public authNenu: MenuItem[] = [
    { title: 'Registro', route: './auth' },
  ];

}
