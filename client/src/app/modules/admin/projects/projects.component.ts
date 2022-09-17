import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ProjectModel, ProjectStatus} from "../../../core/models/project.model";
import {MatPaginator} from "@angular/material/paginator";
import {PaginationHandleModel} from "../../../core/models/pagination.model";
import {ProjectsService} from "../../../core/services/projects.service";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "../../../core/services/notification.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Sort, SortDirection} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator/paginator";
import {ConfirmComponent} from "../../../shared/confirm/confirm.component";
import {ChangeProjectStatusComponent} from "./components/change-project-status/change-project-status.component";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: MatTableDataSource<ProjectModel> = new MatTableDataSource<ProjectModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['image', 'title', 'seen', 'status', 'created', 'action'];
  search: string = '';

  paginatorConfig: PaginationHandleModel = {
    pageSize: 5,
    pageNumber: 0,
    total: 0
  }

  constructor(
    private projectsService: ProjectsService,
    private matDialog: MatDialog,
    private notificationService: NotificationService,
    private matBottomSheet: MatBottomSheet,
  ) {
  }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(sort?: string, sortType?: SortDirection): void {
    this.projectsService.getProjectsAdmin(
      this.paginatorConfig.pageSize,
      this.paginatorConfig.pageNumber,
      this.search,
      sort,
      sortType
    ).subscribe(products => {
      this.projects = new MatTableDataSource<ProjectModel>(products.results)
      this.paginatorConfig.total = products?.total
    })
  }

  getProjectStatus(status: ProjectStatus): string {
    switch (status) {
      case ProjectStatus.unPublished:
        return 'منتشر نشده'
      case ProjectStatus.published:
        return 'منتشر شده'
    }
  }

  paginatorEvent(event: PageEvent): void {
    this.paginatorConfig.pageSize = event.pageSize;
    this.paginatorConfig.pageNumber = event.pageIndex;
    this.getProjects()
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  searchProjects(searchWord: string): void {
    setTimeout(() => {
      this.search = searchWord
      this.paginatorConfig.pageNumber = 0;
      this.paginator.firstPage();
      this.getProjects()
    }, 500)
  }

  deleteProject(projectID: number): void {
    this.matDialog.open(ConfirmComponent, {
      width: '250px'
    }).afterClosed().subscribe(confirm => {
      if (confirm == true) {
        this.projectsService.deleteProject(projectID).subscribe(() => {
          this.notificationService.notification('valid', 'با موفقیت حذف شد')
          this.getProjects()
        })
      }
    })
  }

  editStatus(project: ProjectModel) {
    this.matBottomSheet.open(ChangeProjectStatusComponent, {
      data: project.id,
      hasBackdrop: true,
      direction: 'rtl'
    }).afterDismissed().subscribe(
      res => {
        if (res == 0 || res == 1) {
          project.status = res
        }
      })
  }

  sortData(sort: Sort): void {
    this.paginatorConfig.pageNumber = 0;
    this.paginator.firstPage();
    if (sort.direction !== "") {
      this.getProjects(sort.active, sort.direction)
    } else {
      this.getProjects()
    }
  }

}
