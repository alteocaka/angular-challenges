import { Component } from '@angular/core';
import { NavButtonComponent } from './nav-button.component';
import { RouterLink } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Component({
  standalone: true,
  imports: [NavButtonComponent, RouterLink],
  selector: 'app-home',
  template: `
    <nav-button href="/foo" class="fixed top-3 left-1/2">Foo Page</nav-button>
    <div id="top" class="h-screen bg-gray-500">
      Empty
      <nav-button (click)="onClick('bottom')">Scroll Bottom</nav-button>
    </div>
    <div id="bottom" class="h-screen bg-blue-300">
      I want to scroll each
      <nav-button (click)="onClick('top')">Scroll Top</nav-button>
    </div>
  `,
})
export class HomeComponent {
  constructor(private viewportScroller: ViewportScroller) {}

  public onClick(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
