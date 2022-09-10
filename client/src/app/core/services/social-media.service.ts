import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {SocialMediaModel} from "../models/social-media.model";

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  private _socialMedias: SocialMediaModel[] = [];

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  initSocials(): void {
    this.getSocialMedias().subscribe(socialMedias => {
      this.socialMedias = socialMedias
    })
  }

  set socialMedias(socialMedias: SocialMediaModel[]) {
    this._socialMedias = [...socialMedias,...socialMedias,...socialMedias,...socialMedias,...socialMedias,...socialMedias,...socialMedias,...socialMedias,]
  }

  get socialMedias(): SocialMediaModel[] {
    return this._socialMedias
  }

  // https services

  getSocialMedias(): Observable<SocialMediaModel[]> {
    return this.httpClient.get("/social-media").pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  createSocialMedia(socialMedia: SocialMediaModel): Observable<SocialMediaModel> {
    return this.httpClient.post(`/social-media`, socialMedia).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  editSocialMedia(socialMedia: SocialMediaModel): Observable<SocialMediaModel> {
    return this.httpClient.put(`/social-media/${socialMedia.id}`, socialMedia).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
