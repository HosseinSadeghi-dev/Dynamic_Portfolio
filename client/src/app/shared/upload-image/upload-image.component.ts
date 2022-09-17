import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgxImageCompressService} from "ngx-image-compress";
import {NotificationService} from "../../core/services/notification.service";
import {dataURItoBlob} from "../global/functions";

@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

  @Output() outputImage: EventEmitter<File> = new EventEmitter<File>();
  @Output() deleted: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() inputImage: string = '';
  @Input() title: string = '';
  @Input() bestWidth: number = 0;
  @Input() bestHeight: number = 0;
  @Input() bestAspect!: string;
  @Input() imageType: string = 'img';
  @Input() compressRate: number = 75;
  @Input() componentHeight: number = 0;
  @Input() hasDelete: boolean = false;

  imageToShow: string | ArrayBuffer | null = null;

  constructor(
    private imageCompress: NgxImageCompressService,
    private notificationService: NotificationService
    ) { }

  ngOnInit(): void {
  }

  checkValidatorImage(file: File) {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      this.imageToShow = (<FileReader>event.target).result;
    };
    reader.readAsDataURL(file);
    return true;
  }

  selectImage() {
    this.imageCompress.uploadFile().then(({image, orientation}) => {
      const _imageByte: number = this.imageCompress.byteCount(image)
      // 2MB or 2 * 10^6
      if (_imageByte >= 2e+6) {
        this.notificationService.notification('error', 'حداکثر حجم عکس باید 2MB باید باشد')
        return
      }
      this.imageCompress.compressFile(image, orientation, 100, this.compressRate).then(
        result => {
          let file: File = dataURItoBlob(result, this.imageType)
          if (this.checkValidatorImage(file)) {
            this.outputImage.emit(file)
          } else {
            this.notificationService.notification('error', 'خطایی رخ داده لطفا دوباره سعی کنید')
          }
        }
      );
    });
  }

}
