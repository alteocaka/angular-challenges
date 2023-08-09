import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ComputationPipe } from './compute.pipe';

@Component({
  standalone: true,
  imports: [NgFor, ComputationPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | computeData : index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];

  // heavyComputation(name: string, index: number) {
  //   // very heavy computation
  //   return `${name} - ${index}`;
  // }
}
