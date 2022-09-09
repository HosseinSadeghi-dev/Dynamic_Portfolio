import {Component, OnInit, Input, ChangeDetectorRef, AfterContentChecked} from '@angular/core';
import {AppService} from "../../core/services/app.service";

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, AfterContentChecked {

  loading: boolean = true;

  constructor(
    private appService: AppService,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.appService.loading.subscribe(
      loading => {
        this.loading = loading;
      }
    );
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }


}
