import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SocialMediaService} from "../../core/services/social-media.service";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public socialMediaService: SocialMediaService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.contactForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      name: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  submit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return
    }
  }

}
