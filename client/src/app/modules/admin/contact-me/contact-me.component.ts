import { Component, OnInit } from '@angular/core';
import {ContactMeModel} from "../../../core/models/contact-me.model";
import {ContactMeService} from "../../../core/services/contact-me.service";
import {PaginationHandleModel} from "../../../core/models/pagination.model";
import {PageEvent} from "@angular/material/paginator/paginator";

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {

  contactRequests: ContactMeModel[] = [] as ContactMeModel[];
  paginatorConfig: PaginationHandleModel = {
    pageSize: 5,
    pageNumber: 0,
    total: 0
  }

  constructor(
    private contactMeService: ContactMeService
  ) { }

  ngOnInit(): void {
    this.contactMeService.getContactRequests(
      this.paginatorConfig.pageSize,
      this.paginatorConfig.pageNumber
    ).subscribe(requests => {
      this.contactRequests = requests.results
      this.paginatorConfig.total = requests.total
    })
  }

  paginatorEvent(event: PageEvent): void {
    this.paginatorConfig.pageSize = event.pageSize;
    this.paginatorConfig.pageNumber = event.pageIndex;
    this.ngOnInit()
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

}
