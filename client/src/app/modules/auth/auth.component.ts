import { Component, OnInit } from '@angular/core';
import {CredentialsService} from "../../core/services/credentials.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private credentialsService: CredentialsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [''],
    })
  }

  submit(): void {
    this.credentialsService.login(
      this.loginForm.value.username,
      this.loginForm.value.password
    )
  }

}
