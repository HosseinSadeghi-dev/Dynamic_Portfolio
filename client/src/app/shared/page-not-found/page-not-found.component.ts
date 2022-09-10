import { Component, OnInit } from '@angular/core';
import {AppService} from "../../core/services/app.service";

@Component({
  selector: 'mk-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  constructor(
    public appService: AppService
  ) { }

  ngOnInit() {
  }

}
