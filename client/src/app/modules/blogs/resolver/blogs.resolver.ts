import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {PaginationModel} from "../../../core/models/pagination.model";
import {BlogModel} from "../../../core/models/blog.model";
import {BlogsService} from "../../../core/services/blogs.service";

@Injectable({
  providedIn: 'root'
})
export class BlogsResolver implements Resolve<PaginationModel<BlogModel>> {

  constructor(
    private blogsService: BlogsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationModel<BlogModel>> {
    return this.blogsService.getBlogs(6, 1);
  }
}
