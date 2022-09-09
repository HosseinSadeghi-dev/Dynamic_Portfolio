import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SidenavStatus} from "../../core/models/global.model";
import {AppService} from "../../core/services/app.service";

@Component({
  selector: 'header-drawer',
  templateUrl: './header-drawer.component.html',
  styleUrls: ['./header-drawer.component.scss']
})
export class HeaderDrawerComponent implements OnInit {

  sidenavStatus = SidenavStatus;

  links: {
    name: string,
    link: string,
  }[] = [
    {
      link: '/',
      name: 'خانه',
    },
    {
      link: '/blogs',
      name: 'بلاگ',
    },
  ]

  constructor(
    public appService: AppService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

}
