import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'NoDecimal'
})
export class NoDecimalPipe implements PipeTransform {

  transform(value: number): number {
    return Math.round(value);
  }

}
