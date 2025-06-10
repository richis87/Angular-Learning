import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { map, Observable, retry, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { isFormArray } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class PublicGuard  implements CanMatch, CanActivate   {

  constructor(
    private authservice: AuthService,
    private router: Router
  ) { }

  private checkAthStatus(): Observable<boolean>| boolean{
    return this.authservice.chekAuthentication()
    .pipe(
      tap( isAutenticated => {
        if ( isAutenticated ){
          this.router.navigate(['./']);
        }
      }),
      map( isAutenticated => !isAutenticated )
    )

  }

  canMatch(route: Route, segments: UrlSegment[]): boolean|  Observable<boolean> {
    // console.log({route, segments})
    // return true;
    return this.checkAthStatus();

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean|  Observable<boolean> {
    // console.log({route, state})
    // return true;
    return this.checkAthStatus();
  }



}
