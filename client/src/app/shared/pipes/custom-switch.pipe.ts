import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customSwitch'
})
export class CustomSwitchPipe implements PipeTransform {

  transform(cases: any[], switchOption: any): any {
    return cases.includes(switchOption) ? switchOption : !switchOption;
  }

}
