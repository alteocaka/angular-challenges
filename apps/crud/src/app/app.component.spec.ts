import { DebugElement } from '@angular/core';
import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

describe('AppComponent', () => {
  // Fixture is just the test env, it provides access to the component itself
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  // DebugElement provides us with the renderd html of the component
  let html: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    // Initialize fixture and component
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    html = fixture.debugElement;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
