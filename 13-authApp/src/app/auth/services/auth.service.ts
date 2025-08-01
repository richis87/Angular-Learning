import { computed, inject, Injectable, signal } from '@angular/core';
import { environments } from '../../../environments/environments';

import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus, CheckTokenResponse, LoginResponse, User } from '../interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environments.baseUrl;
  private http = inject(HttpClient);

  private _currentUser = signal<User | null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  //! Al mundo exterior
  // De esta manera nadie fuera del servicio puede hacer cambios
  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {

    this.checkAuthStatus().subscribe();

  }

  private setAuthentication(user:User, token: string):boolean {

    this._currentUser.set(user);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token',token);

    return true;
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/login`;
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body)
    .pipe(
      map( ({user, token }) => this.setAuthentication(user, token)),
      catchError( err =>  throwError( () => err.error.message )
        // console.log(err)
        // return throwError( () => 'Algo no sucedió como lo esperaba' )
        // return of(false)
      // })
    ));
    ///return of(true)
  }

  checkAuthStatus(): Observable<boolean>{

    const url = `${this.baseUrl}/auth/check-token`;
    const token = localStorage.getItem('token');

    if (!token) {
      this.logout();
      return of(false);
    }
    const headers= new HttpHeaders()
    .set('Authorization',`Bearer ${token}`);


    return this.http.get<CheckTokenResponse>(url,{ headers })
    .pipe(
      map( ({user, token }) => this.setAuthentication(user, token)),
      catchError( err =>  throwError( () => err.error.message )
    ));
  }

  logout() {
    localStorage.removeItem('token');
    this._currentUser.set(null);
    this._authStatus.set( AuthStatus.notAuthenticated );

  }

}
