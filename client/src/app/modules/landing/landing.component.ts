import { Component, OnInit } from '@angular/core';
import {AppService} from "../../core/services/app.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    public appService: AppService
  ) { }

  ngOnInit(): void {
  }

}
