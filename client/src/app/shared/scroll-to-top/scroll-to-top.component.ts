import {Component, HostListener, OnInit} from '@angular/core';
import {_document, _window} from "../global/global-variable";

@Component({
  selector: 'scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {

  bottomPosition: '-3px' | '-100px' = '-100px'

  constructor(
  ) { }

  ngOnInit(): void {
    this.onScroll()
  }

  @HostListener('window:scroll')
  onScroll() {
    let y = _window.pageYOffset || _document.documentElement.scrollTop
    if (y > 1000) {
      this.bottomPosition = '-3px';
    }
    else {
      this.bottomPosition = '-100px';
    }
  }

  scrollToTop() {
    _window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

}
