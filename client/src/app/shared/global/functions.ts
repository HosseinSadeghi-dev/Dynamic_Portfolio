import {FormGroup} from "@angular/forms";
import {fromEvent, merge, Observable, Observer} from "rxjs";
import {map} from "rxjs/operators";

/**
 * return An unique array from the array you send as parameter
 *
 * @param array the array you want to make it unique.
 * @param uniqueObject The unique Object of array you want to remove duplicate by (OPTIONAL).
 *
 * @return An `Array` of the unique array.
 */
export function removeDuplicateFromArray(array: any[], uniqueObject?: any): any[] {
  if (uniqueObject) {
    return array.filter((v, i, a) => a.findIndex(t => (t[uniqueObject] === v[uniqueObject])) === i)
  }
  return Array.from(new Set(array));
}

/**
 * copy text into the clipboard
 *
 * @param text the text you want to copy
 *
 */
export function copyText(text: string): void {
  const selBox = document.createElement('textarea');
  selBox.style.position = 'fixed';
  selBox.style.left = '0';
  selBox.style.top = '0';
  selBox.style.opacity = '0';
  selBox.value = text;
  document.body.appendChild(selBox);
  selBox.focus();
  selBox.select();
  document.execCommand('copy');
  document.body.removeChild(selBox);
}

/**
 * return shuffled array
 *
 * @param array the array that you want to shuffle.
 *
 * @return An `array` as the shuffled array.
 */
export function shuffle(array: any[]): any[] {
  let currentIndex = array.length, randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

/**
 * return converted persian word to english
 *
 * @param persian the persian string you want to convert
 *
 * @return converted english word
 */
export function p2e(persian: any) {
  return persian?.toString().replace(/[۰-۹]/g, (d: string) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d).toString())
}

/**
 * return Unique random Number
 *
 * @param range how many numbers to create
 * @param outputCount how many numbers to return
 *
 * @return uniqueNumbers return an array of Unique Numbers
 */
export function randomUniqueNum(range: number, outputCount: number): any[] {
  let arr = []
  for (let i = 1; i <= range; i++) {
    arr.push(i)
  }

  let result = [];

  for (let i = 1; i <= outputCount; i++) {
    const random = Math.floor(Math.random() * (range - i));
    result.push(arr[random]);
    arr[random] = arr[range - i];
  }

  return result;
}

/**
 * check if password confirm is true or not
 *
 * @param form the form to check passwords (FormGroup)
 * @param passwordField password field name in formGroup
 * @param confirmField confirm password field name in formGroup
 *
 */
export function checkPasswordConfirm(form: FormGroup, passwordField: string, confirmField: string): void {
  form.valueChanges.subscribe(res => {
    if (res[confirmField] && res[passwordField]) {
      if (res[confirmField] !== res[passwordField]) {
        form.controls[confirmField].setErrors({'incorrect': true})
      }
      if (res[confirmField] === res[passwordField]) {
        form.controls[confirmField].setErrors(null)
      }
    }
  })
}

/**
 * intersect two array with their unique key of each other
 *
 * @param arr1 first array
 * @param arr1Key key to check first array
 * @param arr2 second array
 * @param arr2Key key to check second array
 *
 * @return intersectedArray return an array of intersected arrays
 */
export function intersectionByKey(arr1: any[], arr2: any[], arr1Key?: string, arr2Key?: string): any[] {

  if (arr1Key && arr2Key) {
    return arr1.filter(
      (set => a => set.has(a[arr1Key]))(new Set(arr2.map(b => b[arr2Key])))
    );
  } else if (arr1Key && !arr2Key) {
    return arr1.filter(
      (set => a => set.has(a[arr1Key]))(new Set(arr2.map(b => b)))
    );
  } else if (!arr1Key && arr2Key) {
    return arr1.filter(
      (set => a => set.has(a))(new Set(arr2.map(b => b[arr2Key])))
    );
  } else {
    return arr1.filter(
      (set => a => set.has(a))(new Set(arr2.map(b => b)))
    );
  }


}


/**
 * intersect two array with their unique key of each other
 *
 * @param value string to mask
 * @param pattern pattern you want to make into
 *
 * @return string shifted string with pattern
 */
export function maskString(value: string, pattern: string): string {
  let count: number = 0;
  return pattern.replace(/\+/g, () => value[count++] || '')
}

/**
 * random string with limited length
 *
 * @param length length of string
 *
 * @return randomString return a random number between two input number
 */
export function getRandomString(length: number): string {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}


/**
 * random string with limited length
 *
 * @param dataURI dataURI
 * @param filePrefix prefix name of file
 *
 * @return randomString return a random number between two input number
 */
export function dataURItoBlob(dataURI: string, filePrefix: string): File {
  const byteString = atob(dataURI.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  const imageBlob = new Blob([int8Array], {type: 'image/png'});
  return new File([imageBlob], `${filePrefix}_${getRandomString(10)}.png`, {type: 'image/png'})
}


/**
 * return if network is connected or not
 *
 * @return An `observable` as the network connectivity.
 */
export function networkConnection(): Observable<any> {
  return merge<any>(
    fromEvent(window, 'offline').pipe(map(() => false)),
    fromEvent(window, 'online').pipe(map(() => true)),
    new Observable((sub: Observer<boolean>) => {
      sub.next(navigator.onLine);
      sub.complete();
    }));
}
