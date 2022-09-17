import {Component, OnInit} from '@angular/core';
import {AppService} from "../../core/services/app.service";
import {SettingService} from "../../core/services/setting.service";
import {PersonalService} from "../../core/services/personal.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public personalService: PersonalService,
    public settingService: SettingService,
    public appService: AppService
  ) {
  }

  activeLink: {
    route: string,
    name: string,
  } = {
    name: 'تنظیمات کلی',
    route: 'info',
  }

  navLinks: {
    route: string,
    name: string,
  }[] = [
    {
      name: 'تنظیمات کلی',
      route: 'info',
    },
    {
      name: 'مقالات',
      route: 'blogs',
    },
    {
      name: 'پروژه ها',
      route: 'projects',
    },
    {
      name: 'ارتباط با من',
      route: 'contacts',
    },
  ]

  ngOnInit(): void {
  }

}
