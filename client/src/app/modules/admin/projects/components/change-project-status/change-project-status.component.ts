import {Component, Inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {ProjectStatus} from "../../../../../core/models/project.model";
import {ProjectsService} from "../../../../../core/services/projects.service";

@Component({
  selector: 'app-change-project-status',
  templateUrl: './change-project-status.component.html',
  styleUrls: ['./change-project-status.component.scss']
})
export class ChangeProjectStatusComponent implements OnInit {

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
    private _bottomSheetRef: MatBottomSheetRef<ChangeProjectStatusComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public projectStatus: number,
    private projectsService: ProjectsService
  ) { }

  ngOnInit(): void {
  }

  changeStatus(status: ProjectStatus): void {
    this.projectsService.editProjectStatus(this.projectStatus, status).subscribe(() => {
      this._bottomSheetRef.dismiss(status);
    })
  }

}
