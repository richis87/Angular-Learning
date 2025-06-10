import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  private authService = inject( AuthService );


  public user = computed(() => this.authService.currentUser() );//Forma de tener propiedades de solo lectura





  // Forma 2 de consultar el usuario
  // get user(){
  //   return this.authService.currentUser();
  // }

  onLogout() {
    this.authService.logout();
  }

}
