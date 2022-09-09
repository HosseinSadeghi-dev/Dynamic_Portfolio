import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'jalali-moment'

/**
 * For Change gregorian to jalali.
 */
@Pipe({
  name: 'jalaliDate'
})
export class JalaliDatePipe implements PipeTransform {

  transform(date: string | Date,
            param?: 'timeDiff24' | 'yearMonth' | 'dayMonth' | 'dateTime' | 'weekDayName' | 'timeHour' | string): any {
    let format: string;

    if (!date) {
      return null;
    }

    if (param === 'timeDiff24') {
      const ms = moment().diff(moment(date, 'YYYY - MM - DDT HH: mm: ss'));
      const d = moment.duration(ms);
      const hour24 = (24 * 3600000) - d.asMilliseconds(); //  24h to ms - my ms
      return moment.utc(hour24).format('H:mm');
    }

    switch (param) {
      case 'yearMonth':
        format = 'jMMMM jYYYY';
        break;
      case 'dayMonth':
        format = 'jDD jMMMM';
        break;
      case 'dateTime':
        format = 'jDD jMMMM  jYYYY' + '، ' + 'HH:mm:ss';
        break;
      case 'timeHour':
        format = 'HH:mm';
        break;
      case 'weekDayName':
        format = 'jYYYY/jMM/jDD, dddd';
        break;
      default:
        format = 'jYYYY/jMM/jDD';
    }
    return moment(date).locale('fa').format(format);
  }
}
