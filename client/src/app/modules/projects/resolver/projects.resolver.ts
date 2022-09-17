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
import {ProjectsService} from "../../../core/services/projects.service";
import {ProjectModel} from "../../../core/models/project.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectsResolver implements Resolve<PaginationModel<ProjectModel>> {

  constructor(
    private projectsService: ProjectsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginationModel<ProjectModel>> {
    return this.projectsService.getProjects(9, 0);
  }
}
