import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'wrapFn', standalone: true })
export class WrapFunctionsPipe implements PipeTransform {
  transform(value: any, ...args: Parameters<any>) {
    for (const arg of args) {
      value = value + ' ' + arg;
    }

    return value;
  }
}
