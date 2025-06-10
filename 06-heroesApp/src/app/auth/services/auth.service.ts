import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
import { User } from '../interfaces/user.interface';
import { catchError, map, Observable, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) { }

  get currentUser(): User | undefined {
    if (!this.user) return undefined;
    //Se usa para realizar un clon profundo desde la versión 17 / se puede utilizar el spread
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<User> {

    console.log('entra')
    return this.http.get<User[]>(`${this.baseUrl}/users?id=1`)
      .pipe(
        map(user => user[0]),
        tap(user => this.user = user),
        // tap(user => localStorage.setItem('token', user.id.toString())),
        tap(user => localStorage.setItem('token', 'WERSDFTETWEGDSRETRESDFSdf4545f'))
      );
  }

  chekAuthentication():Observable<boolean>{

    if(!localStorage.getItem('token')) return of(false)

    const token = localStorage.getItem('token');

    return this.http.get<User[]>(`${this.baseUrl}/users?id=1`)
    .pipe(
      map(user => user[0]),
      tap(user => this.user = user),
      map(user => !!user),
      catchError(err => of(false) )
    )
  }

  logout():void{
    this.user = undefined;
    localStorage.clear();
  }


}
