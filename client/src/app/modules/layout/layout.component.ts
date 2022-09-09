import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from "../../core/services/app.service";
import {SidenavStatus} from "../../core/models/global.model";
import {MatSidenav} from "@angular/material/sidenav";
import {_window} from "../../shared/global/global-variable";

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
    if (this.appService.windowWidth < 959) {
      this.appService.headerSidenav.subscribe(status => {
        if (status == SidenavStatus.open) {
        } else if (status == SidenavStatus.close) {
          this.headerDrawer.close()
        }
      })
    } else {
      this.headerDrawer.open()
    }
  }

}
