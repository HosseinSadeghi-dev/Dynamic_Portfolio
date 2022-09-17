import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {ProjectsService} from "../../../core/services/projects.service";
import {ProjectModel} from "../../../core/models/project.model";

@Injectable({
  providedIn: 'root'
})
export class ProjectViewResolver implements Resolve<ProjectModel> {

  constructor(
    private projectsService: ProjectsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProjectModel> {
    return this.projectsService.getOneProject(route.params['id']);
  }
}
