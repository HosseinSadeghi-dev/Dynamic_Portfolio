import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {SortDirection} from "@angular/material/sort";
import {Observable, throwError} from "rxjs";
import {PaginationModel} from "../models/pagination.model";
import {BlogModel} from "../models/blog.model";
import {catchError, map} from "rxjs/operators";
import {ContactMeModel} from "../models/contact-me.model";

@Injectable({
  providedIn: 'root'
})
export class ContactMeService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getContactRequests(
    pageSize: number,
    pageNumber: number,
  ): Observable<PaginationModel<ContactMeModel>> {

    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber)

    return this.httpClient.get("/contact-me", {params: params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  contactMe(contactRequest: ContactMeModel): Observable<any> {
    return this.httpClient.post("/contact-me", contactRequest).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
