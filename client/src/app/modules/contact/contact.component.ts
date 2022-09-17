import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SocialMediaService} from "../../core/services/social-media.service";
import {ContactMeService} from "../../core/services/contact-me.service";
import {NotificationService} from "../../core/services/notification.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() fromLanding: boolean = false
  contactForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public socialMediaService: SocialMediaService,
    private contactMeService: ContactMeService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      fullName: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return
    }
    this.contactMeService.contactMe(this.contactForm.value).subscribe(() => {
      this.notificationService.notification("valid", 'با موفقیت ثبت شد، در اسرع وقت با شما تماس خواهم گرفت!')
    })
  }

}
