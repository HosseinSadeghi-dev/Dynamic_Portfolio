import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'number'
})
export class NumberPipe implements PipeTransform {

  transform(value: any, args?: any | 'card'): any {
    if (!value) {
      return 0;
    }
    if (!args) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    else if (args == 'card') {
      return value.toString().replace(/\B(?=(\d{4})+(?!\d))/g, ' - ');
    }
  }

}
