import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SidenavStatus} from "../../core/models/global.model";
import {AppService} from "../../core/services/app.service";
import {SettingService} from "../../core/services/setting.service";
import {SocialMediaService} from "../../core/services/social-media.service";

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
      link: '/about',
      name: 'درباره من',
    },
    {
      link: '/projects',
      name: 'کارهای من',
    },
    {
      link: '/blogs',
      name: 'مقالات',
    },
    {
      link: '/contact',
      name: 'ارتباط با من',
    },
  ]

  constructor(
    public appService: AppService,
    public settingService: SettingService,
  ) {
  }

  ngOnInit(): void {
  }

}
