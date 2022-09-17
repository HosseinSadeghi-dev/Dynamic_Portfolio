import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {SettingService} from "../../../core/services/setting.service";
import {PersonalService} from "../../../core/services/personal.service";
import {NotificationService} from "../../../core/services/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {AddSkillDialogComponent} from "./components/add-skill-dialog/add-skill-dialog.component";
import {SkillModel} from "../../../core/models/personal.model";
import {ConfirmComponent} from "../../../shared/confirm/confirm.component";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  infoForm!: FormGroup;
  cvLink: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private settingService: SettingService,
    public personalService: PersonalService,
    private notificationService: NotificationService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.createInformationForm();
    this.getPersonalDetail();
    this.getSkills()
  }

  getPersonalDetail(): void {
    this.personalService.getPersonal().subscribe(personal => {
      this.personalService.personalDetail = personal
      this.createInformationForm()
    })
  }

  createInformationForm(): void {
    this.infoForm = this.formBuilder.group({
      id: [this.personalService.personalDetail?.id],
      fullName: [this.personalService.personalDetail?.fullName ? this.personalService._personalDetail.fullName : '', []],
      phoneNumber: [this.personalService.personalDetail?.phoneNumber ? this.personalService._personalDetail.phoneNumber : '', []],
      age: [this.personalService.personalDetail?.age ? this.personalService._personalDetail.age : '', []],
      email: [this.personalService.personalDetail?.email ? this.personalService._personalDetail.email : '', []],
      languages: [this.personalService.personalDetail?.languages ? this.personalService._personalDetail.languages : '', []],
      nationality: [this.personalService.personalDetail?.nationality ? this.personalService._personalDetail.nationality : '', []],
      mainField: [this.personalService.personalDetail?.mainField ? this.personalService._personalDetail.mainField : '', []],
      desc: [this.personalService.personalDetail?.desc ? this.personalService._personalDetail.desc : '', []],
      address: [this.personalService.personalDetail?.address ? this.personalService._personalDetail.address : '', []],
    })
  }

  submitPersonalData(cvInput?: EventTarget | any): void {
    this.personalService.setPersonal(this.infoForm.value, cvInput.files[0]).subscribe(res => {
      this.notificationService.notification('valid', 'با موفقیت ثبت شد')
      this.personalService.personalDetail = res
    })
  }

  getSkills(): void {
    this.personalService.getSkills().subscribe(skills => {
      this.personalService.skills = skills
    })
  }

  handleSkill(skill?: SkillModel): void {
    this.matDialog.open(AddSkillDialogComponent, {
      width: '350px',
      maxWidth: '100%',
      data: skill ? skill : {}
    }).afterClosed().subscribe((res: SkillModel) => {
      if (res) {
        if (res?.id) {
          this.personalService.editSkill(res).subscribe(res => {
            skill = res
            this.notificationService.notification('valid', 'با موفقیت ثبت شد')
          })
        } else {
          this.personalService.addSkill(res).subscribe(res => {
            this.personalService.skills = [...this.personalService.skills, res]
            this.notificationService.notification('valid', 'با موفقیت ثبت شد')
          })
        }
      }
    })
  }

  deleteSkill(skillId: number): void {
    this.matDialog.open(ConfirmComponent, {
      width: '250px'
    }).afterClosed().subscribe(confirm => {
      if (confirm == true) {
        this.personalService.deleteSkill(skillId).subscribe(() => {
          this.notificationService.notification('valid', 'با موفقیت حذف شد')
          this.personalService.skills = this.personalService.skills.filter(f => f.id !== skillId)
        })
      }
    })
  }

}
