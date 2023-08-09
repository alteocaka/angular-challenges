import { Pipe, PipeTransform } from '@angular/core';
import { PersonUtils } from './person.utils';

@Pipe({ name: 'util', standalone: true })
export class UtilsPipe implements PipeTransform {
  transform(value: any, functionName: string, ...args: any[]) {
    const func: Function = (PersonUtils as any)[functionName];
    return func(value, args);
  }
}
