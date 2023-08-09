import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'computeData', standalone: true })
export class ComputationPipe implements PipeTransform {
  transform(name: string, index: number) {
    return `${name} - ${index}`;
  }
}
