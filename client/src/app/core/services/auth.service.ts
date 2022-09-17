import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {UserRole} from "../models/global.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  signIn(username: string, password: string): Observable<any> {
    const _data = {
      username: username,
      password: password
    }

    return this.httpClient.post(`/auth/sign-in`, _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  signUp(username: string, password: string, role: UserRole): Observable<any> {
    const _data = {
      username: username,
      password: password,
      role: role
    }

    return this.httpClient.post(`/auth/sign-up`, _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  checkToken(): Observable<any> {
    return this.httpClient.get(`/auth`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
