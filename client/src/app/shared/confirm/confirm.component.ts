import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'mk-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public message: string,
    public dialogRef: MatDialogRef<ConfirmComponent>
  ) {}

}
