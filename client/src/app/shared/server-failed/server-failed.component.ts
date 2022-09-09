import { Component, OnInit } from '@angular/core';
import {AppService} from "../../core/services/app.service";

@Component({
  selector: 'server-failed',
  templateUrl: './server-failed.component.html',
  styleUrls: ['./server-failed.component.scss']
})
export class ServerFailedComponent implements OnInit {


  constructor(
    private appService: AppService
  ) { }

  ngOnInit(): void {
  }

  refreshPage() {
    this.appService.refresh();
  }

}
