import {Component, Input, OnInit} from '@angular/core';
import {PaginationHandleModel, PaginationModel} from "../../core/models/pagination.model";
import {ProjectsService} from "../../core/services/projects.service";
import {ActivatedRoute} from "@angular/router";
import {ProjectModel} from "../../core/models/project.model";
import {PageEvent} from "@angular/material/paginator/paginator";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @Input() fromLanding: boolean = false
  projects!: PaginationModel<ProjectModel>;
  pagination: PaginationHandleModel = {
    pageSize: 6,
    pageNumber: 0,
  }

  constructor(
    private projectsService: ProjectsService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.getProjectsByRouteData()
  }

  getProjectsByRouteData(): void {
    this.activatedRoute.data.subscribe(data => {
      if (data && data['projects']) {
        this.projects = data['projects']
        this.pagination.pageSize = this.projects.page_total
      } else {
        this.getProjects()
      }
    })
  }

  getProjects(): void {
    this.projectsService.getProjects(
      this.pagination.pageSize,
      this.pagination.pageNumber
    ).subscribe(projects => {
      this.projects = projects
    })
  }

  handlePagination(page: PageEvent): void {
    this.pagination.pageSize = page.pageSize;
    this.pagination.pageNumber = page.pageIndex;
    this.getProjects()
  }

}
