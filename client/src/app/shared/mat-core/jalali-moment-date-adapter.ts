// import { Inject, Injectable, Optional } from '@angular/core';
import {DateAdapter} from '@angular/material/core';
import * as  moment from 'jalali-moment';

/** Creates an array and fills it with values. */
function range<T>(length: number, valueFunction: (index: number) => T): T[] {
  const valuesArray = Array(length);
  for (let i = 0; i < length; i++) {
    valuesArray[i] = valueFunction(i);
  }
  return valuesArray;
}

export class JalaliMomentDateAdapter extends DateAdapter<moment.Moment> {

  constructor() {
    // @Optional() @Inject(MAT_DATE_LOCALE) dateLocale: string
    super();
    // this.setLocale(dateLocale || jmoment.locale(dateLocale));
    super.setLocale('fa');
  }


  /**
   * returns year in jalali calendar system.
   */
  getYear(date: moment.Moment): number {
    return this.clone(date).jYear();
  }

  /**
   * returns month in jalali calendar system.
   */
  getMonth(date: moment.Moment): number {
    return this.clone(date).jMonth();
  }

  /**
   * returns day in jalali calendar system.
   */
  getDate(date: moment.Moment): number {
    return this.clone(date).jDate();
  }

  /**
   * returns Day Of Week in jalali calendar system.
   */
  getDayOfWeek(date: moment.Moment): number {
    return this.clone(date).day();
  }

  /**
   * returns Month Names in jalali calendar system.
   * most of the time we use long format. short or narrow format for month names is a little odd.
   */
  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
      case 'short':
        return moment.localeData('fa').jMonths().slice(0);
      case 'narrow':
        return moment.localeData('fa').jMonthsShort().slice(0);
    }
  }

  /**
   * borrowed from angular material code.
   */
  getDateNames(): string[] {
    return range(31, i => String(i + 1));
    // return this._localeData.dates;
  }

  /**
   * returns Day Of Week names in jalali calendar system.
   */
  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    switch (style) {
      case 'long':
        return moment.localeData('fa').weekdays().slice(0);
      case 'short':
        return moment.localeData('fa').weekdaysShort().slice(0);
      case 'narrow':
        return ['ی', 'د', 'س', 'چ', 'پ', 'ج', 'ش'];
      // return jmoment.localeData('fa').weekdaysMin().slice(0);
    }
  }

  /**
   * returns year in jalali calendar system.
   */
  getYearName(date: moment.Moment): string {
    return this.clone(date).jYear().toString();
  }

  /**
   * returns first day of week in jalali calendar system.
   * first day of week is saturday, شنبه
   */
  getFirstDayOfWeek(): number {
    return moment.localeData('fa').firstDayOfWeek();
    // return 6;
  }

  /**
   * returns Number of Days In Month in jalali calendar system.
   */
  getNumDaysInMonth(date: moment.Moment): number {
    return this.clone(date).jDaysInMonth();
  }

  clone(date: moment.Moment): moment.Moment {
    return date.clone().locale('fa');
  }

  /**
   * Pass 3 number in jalali calendar system to this function and it returns a moment object
   * @param year jalali year
   * @param month zero indexed jalali month
   * @param date jalali day
   */
  createDate(year: number, month: number, date: number): moment.Moment {
    if (month < 0 || month > 11) {
      throw Error(
        `Invalid month index "${month}". Month index has to be between 0 and 11.`
      );
    }
    if (date < 1) {
      throw Error(`Invalid date "${date}". Date has to be greater than 0.`);
    }
    const result = moment()
      .jYear(year).jMonth(month).jDate(date)
      .hours(0).minutes(0).seconds(0).milliseconds(0)
      .locale('fa');
    // Check that the date wasn't above the upper bound for the month, causing the month to overflow
    if (this.getMonth(result) !== month) {
      throw Error(`Invalid date ${date} for month with index ${month}.`);
    }
    if (!result.isValid()) {
      throw Error(`Invalid date "${date}" for month with index "${month}".`);
    }
    return result;
  }

  today(): moment.Moment {
    return moment().locale('fa');
  }

  parse(value: any, parseFormat: string | string[]): moment.Moment | null {
    if (value && typeof value === 'string') {
      return moment(value, parseFormat, 'fa');
    }
    return value ? moment(value).locale('fa') : null;
  }

  format(date: moment.Moment, displayFormat: string): string {
    date = this.clone(date);
    if (!this.isValid(date)) {
      throw Error('JalaliMomentDateAdapter: Cannot format invalid date.');
    }
    return date.format(displayFormat);
  }

  addCalendarYears(date: moment.Moment, years: number): moment.Moment {
    return this.clone(date).add(years, 'jYear');
  }

  addCalendarMonths(date: moment.Moment, months: number): moment.Moment {
    return this.clone(date).add(months, 'jmonth');
  }

  addCalendarDays(date: moment.Moment, days: number): moment.Moment {
    return this.clone(date).add(days, 'jDay');
  }

  /**
   *Gets the RFC 3339 compatible string (https://tools.ietf.org/html/rfc3339) for the given date.
   * This method is used to generate date strings that are compatible with native HTML attributes
   *such as the `min` or `max` attribute of an `<input>`.
   *@param date The date to get the ISO date string for.
   *@returns The ISO date string date string.
   */
  toIso8601(date: moment.Moment): string {
    return this.clone(date).format();
  }

  isDateInstance(obj: any): boolean {
    return moment.isMoment(obj);
  }

  isValid(date: moment.Moment): boolean {
    return this.clone(date).isValid();
    // return date.isValid();
  }

  invalid(): moment.Moment {
    return moment.invalid();
  }

  /**
   * Returns the given value if given a valid Moment or null. Deserializes valid ISO 8601 strings
   * (https://www.ietf.org/rfc/rfc3339.txt) and valid Date objects into valid Moments and empty
   * string into null. Returns an invalid date for all other values.
   */

  /**
   * Attempts to deserialize a value to a valid date object. This is different from parsing in that
   * deserialize should only accept non-ambiguous, locale-independent formats (e.g. a ISO 8601
   * string). The default implementation does not allow any deserialization, it simply checks that
   * the given value is already a valid date object or null. The `<mat-datepicker>` will call this
   * method on all of it's `@Input()` properties that accept dates. It is therefore possible to
   * support passing values from your backend directly to these properties by overriding this method
   * to also deserialize the format used by your backend.
   * @param value The value to be deserialized into a date object.
   * @returns The deserialized date object, either a valid date, null if the value can be
   *     deserialized into a null date (e.g. the empty string), or an invalid date.
   */
  override deserialize(value: any): moment.Moment | null {
    let date;
    if (value instanceof Date) {
      date = moment(value);
    }
    if (typeof value === 'string') {
      if (!value) {
        return null;
      }
      // date = jmoment(value, jmoment.ISO_8601).locale('fa');
      date = moment(value).locale('fa');
    }
    if (date && this.isValid(date)) {
      return date;
    }
    return super.deserialize(value);
  }
}
