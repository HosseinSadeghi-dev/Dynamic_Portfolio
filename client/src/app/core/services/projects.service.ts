import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {PaginationModel} from "../models/pagination.model";
import {ProjectModel, ProjectStatus} from "../models/project.model";
import {SortDirection} from "@angular/material/sort";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  // admin
  getProjectsAdmin(
    pageSize: number,
    pageNumber: number,
    searchText?: string,
    sort?: string,
    sortType: SortDirection = 'desc',
  ): Observable<PaginationModel<ProjectModel>> {

    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber)

    if (searchText) {
      params = params.set('searchText', searchText)
    }

    if (sort) {
      params = params.set('sort', sort)
      params = params.set('sortType', sortType.toUpperCase())
    }

    return this.httpClient.get("/projects/admin",{params: params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getOneProjectAdmin(id: number): Observable<ProjectModel> {
    return this.httpClient.get(`/projects/admin/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  createProject(project: ProjectModel, image?: File | null): Observable<ProjectModel> {
    const formData: FormData = new FormData()

    Object.entries(project).forEach(item => {
      formData.append(item[0], item[1]);
    });

    if (image) {
      formData.append('image', image)
    }

    return this.httpClient.post(`/projects`, formData).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  editProject(project: ProjectModel, image?: File | null): Observable<ProjectModel> {
    const formData: FormData = new FormData()

    Object.entries(project).forEach(item => {
      formData.append(item[0], item[1]);
    });

    if (image) {
      formData.append('image', image)
    }

    return this.httpClient.post(`/projects`, formData).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  editProjectStatus(id: number, status: ProjectStatus): Observable<any> {
    const _data = {
      status: status
    }
    return this.httpClient.patch(`/projects/${id}`, _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteProject(id: number): Observable<any> {
    return this.httpClient.delete(`/projects/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  // customer and common

  getProjects(pageSize: number, pageNumber: number, searchText?: string): Observable<PaginationModel<ProjectModel>> {

    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber)

    if (searchText) {
      params = params.set('searchText', searchText)
    }


    return this.httpClient.get("/projects", {params: params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getOneProject(id: number): Observable<ProjectModel> {
    return this.httpClient.get(`/projects/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
