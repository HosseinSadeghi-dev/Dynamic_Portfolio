import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from "../../core/services/app.service";
import {SidenavStatus} from "../../core/models/global.model";
import {MatSidenav} from "@angular/material/sidenav";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {

  SidenavStatus = SidenavStatus;
  @ViewChild('headerDrawer') headerDrawer!: MatSidenav;

  constructor(
    public appService: AppService
  ) { }

  ngAfterViewInit() {
    this.appService.headerSidenav.subscribe(status => {
      if (status == SidenavStatus.open) {
        this.headerDrawer.open()
      } else if (status == SidenavStatus.close) {
        this.headerDrawer.close()
      }
    })
    if (this.appService.windowWidth < 959) {
      this.headerDrawer.close()
    } else {
      this.headerDrawer.open()
    }
  }

}
