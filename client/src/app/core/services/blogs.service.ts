import {Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {BlogModel, BlogStatus} from "../models/blog.model";
import {PaginationModel} from "../models/pagination.model";

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  // admin
  getBlogsAdmin(): Observable<PaginationModel<BlogModel>> {
    return this.httpClient.get("/blogs/admin").pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getOneBlogAdmin(id: number): Observable<BlogModel> {
    return this.httpClient.get(`/blogs/admin/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  createBlog(blog: BlogModel, image?: File): Observable<BlogModel> {
    const formData: FormData = new FormData()

    Object.entries(blog).forEach(item => {
      formData.append(item[0], item[1]);
    });

    // for (const key in blog as any) {
    //   if (blog.hasOwnProperty(key)) {
    //     if (blog[key as keyof BlogModel]) {
    //       formData.append(key, blog[key as keyof BlogModel].toString());
    //     }
    //   }
    // }

    if (image) {
      formData.append('image', image)
    }

    return this.httpClient.post(`/blogs`, formData).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  editBlog(blog: BlogModel, image?: File): Observable<BlogModel> {
    const formData: FormData = new FormData()

    Object.entries(blog).forEach(item => {
      formData.append(item[0], item[1]);
    });

    if (image) {
      formData.append('image', image)
      formData.append('imageDeleted', 'true')
    }

    return this.httpClient.post(`/blogs`, formData).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  editBlogStatus(id: number, status: BlogStatus): Observable<any> {
    const _data = {
      status: status
    }
    return this.httpClient.patch(`/blogs/${id}`, _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteBlog(id: number): Observable<any> {
    return this.httpClient.delete(`/blogs/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  // customer and common

  getBlogs(pageSize: number, pageNumber: number, searchText?: string): Observable<PaginationModel<BlogModel>> {

    let params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber)

    if (searchText) {
      params = params.set('searchText', searchText)
    }


    return this.httpClient.get("/blogs", {params: params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getOneBlog(id: number): Observable<BlogModel> {
    return this.httpClient.get(`/blogs/${id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
