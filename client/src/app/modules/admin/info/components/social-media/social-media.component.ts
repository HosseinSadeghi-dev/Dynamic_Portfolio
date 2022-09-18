import {Component, OnInit} from '@angular/core';
import {SocialMediaService} from "../../../../../core/services/social-media.service";
import {SocialMediaModel} from "../../../../../core/models/social-media.model";
import {NotificationService} from "../../../../../core/services/notification.service";

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {

  socialMedias: SocialMediaModel[] = []

  constructor(
    private socialMediaService: SocialMediaService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getSocials();
  }

  getSocials(): void {
    this.socialMediaService.getSocialMedias().subscribe(socials => {
      this.socialMedias = socials
    })
  }

  setSocial(social: SocialMediaModel): void {
    this.socialMediaService.editSocialMedia(social).subscribe(newSocial => {
      this.notificationService.notification('valid', 'با موفقیت ثبت شد');
      social = newSocial;
    })
  }

}
