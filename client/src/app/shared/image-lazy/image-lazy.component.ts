import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'image-lazy',
  templateUrl: './image-lazy.component.html',
  styleUrls: ['./image-lazy.component.scss']
})
export class ImageLazyComponent implements OnInit {

  @ViewChild('img') img!: ElementRef;
  @Input() src: string = '';
  @Input() alt: string = 'alternative';
  @Input() addClass: string = '';
  @Input() title: string = 'title';
  defaultImage = 'assets/img/image-loader.svg';
  width: number = 0;
  height: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  onLoad() {
    this.width = (this.img.nativeElement as HTMLImageElement).naturalWidth
    this.height = (this.img.nativeElement as HTMLImageElement).naturalHeight
  }

}
