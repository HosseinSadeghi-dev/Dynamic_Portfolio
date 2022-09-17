import {Component, Inject, OnInit} from '@angular/core';
import {SkillModel} from "../../../../../core/models/personal.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-skill-dialog',
  templateUrl: './add-skill-dialog.component.html',
  styleUrls: ['./add-skill-dialog.component.scss']
})
export class AddSkillDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<AddSkillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public skill: SkillModel,
  ) { }

  ngOnInit(): void {
  }

  close(result?: SkillModel): void {
    this.dialogRef.close(result)
  }

}
