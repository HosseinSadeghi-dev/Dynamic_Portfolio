import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {PersonalModel, SkillModel} from "../models/personal.model";
import {_document, _window} from "../../shared/global/global-variable";

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  _personalDetail!: PersonalModel;
  _skills: SkillModel[] = [];

  constructor(
    private httpClient: HttpClient
  ) {
  }


  checkPWAManifest(): void {
    const faviconEl: any = document.getElementById('favicon');

    let myDynamicManifest = {
      "name": this.personalDetail.fullName,
      "short_name": this.personalDetail.fullName,
      "description": this.personalDetail.desc,
      "display": "standalone",
      "orientation": "portrait",
      "scope": _window.location.origin,
      "start_url": _window.location.origin,
      "developer": {
        "name": "Hossein Sadeghi",
        "url": "https://www.linkedin.com/in/hossein-sadeghi-077092209/"
      },
      "background_color": "#fafafa",
      "theme_color": _document.documentElement.style
        .getPropertyValue('--custom-primary-color'),
      "icons": [
        {
          "src": `${faviconEl.href}`,
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
      ]
    }
    const stringManifest = JSON.stringify(myDynamicManifest);
    const blob = new Blob([stringManifest], {type: 'application/json'});
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function () {
      const manifest: any = reader.result
      _document.querySelector('#PWAManifest')?.setAttribute('href', manifest);
    };
  }

  initPersonal(): any {
    this.getPersonal().subscribe(personal => {
      this.personalDetail = personal
      this.checkPWAManifest()
    })
  }

  initSkills(): void {
    this.getSkills().subscribe(skills => {
      this.skills = skills
    })
  }

  get personalDetail(): PersonalModel {
    return this._personalDetail
  }

  set personalDetail(personal: PersonalModel) {
    this._personalDetail = personal
  }

  get skills(): SkillModel[] {
    return this._skills
  }

  set skills(skills: SkillModel[]) {
    this._skills = skills
  }

  getPersonal(): Observable<PersonalModel> {
    return this.httpClient.get("/personal").pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  setPersonal(personal: PersonalModel, cv?: File): Observable<PersonalModel> {
    const formData: FormData = new FormData()

    Object.entries(personal).forEach(item => {
      formData.append(item[0], item[1]);
    });

    if (cv) {
      formData.append('cv', cv)
    }

    return this.httpClient.put("/personal", formData).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getSkills(): Observable<SkillModel[]> {
    return this.httpClient.get("/personal/skill").pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  addSkill(skill: SkillModel): Observable<SkillModel> {
    return this.httpClient.post("/personal/skill", skill).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  editSkill(skill: SkillModel): Observable<SkillModel> {
    return this.httpClient.put(`/personal/skill/${skill.id}`, skill).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteSkill(skillId: number): Observable<any> {
    return this.httpClient.delete(`/personal/skill/${skillId}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
