import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../../../core/services/notification.service";
import {ProjectModel, ProjectStatus} from "../../../../core/models/project.model";
import {ProjectsService} from "../../../../core/services/projects.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  project = {} as ProjectModel;
  imageToUpload: File | null = null;
  projectStatuses: {
    name: string,
    status: ProjectStatus
  }[] = [
    {
      name: 'منتشر شده',
      status: ProjectStatus.published
    },
    {
      name: 'منتشر نشده',
      status: ProjectStatus.unPublished
    },
  ];

  constructor(
    private projectsService: ProjectsService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.projectsService.getOneProjectAdmin(params['id']).subscribe(project => {
          this.project = project
        })
      }
    })
  }

  imageDeleted(): void {
    if (this.project.id && this.project.image) {
      this.project.imageDeleted = true
      this.project.image = ''
    }
    this.imageToUpload = null
  }

  submit(): void {
    if (this.project.id) {
      this.projectsService.editProject(this.project, this.imageToUpload).subscribe(() => {
        this.notificationService.notification('valid', 'با موفقیت ویرایش شد')
        this.router.navigate(['/admin/projects'])
      })
    } else {
      this.projectsService.createProject(this.project, this.imageToUpload).subscribe(() => {
        this.notificationService.notification('valid', 'با موفقیت ایجاد شد')
        this.router.navigate(['/admin/projects'])
      })
    }
  }

}
