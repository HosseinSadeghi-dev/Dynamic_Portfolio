import {Component, Input, OnInit} from '@angular/core';
import {PersonalService} from "../../core/services/personal.service";
import {PersonalModel, SkillModel} from "../../core/models/personal.model";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  @Input() fromLanding: boolean = false

  constructor(
    public personalService: PersonalService
  ) { }

  ngOnInit(): void {
  }

}
