import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoItemComponent } from './todo-item.component';
import { TodoItemStore } from './todo-item.store';
import { HttpClientModule } from '@angular/common/http';
import { AppStore } from '../app.store';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TodoItemComponent, HttpClientModule],
      providers: [TodoItemStore, AppStore],
    });
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
  });

  it('should create component', async () => {
    expect(component).toBeTruthy();
  });

  it('should contain the sentence "This is a {{dummyName}}!"', () => {
    const html: HTMLElement = fixture.nativeElement;
    fixture.detectChanges();
    expect(html.querySelector('p')?.textContent).toContain(
      `This is a ${component.dummyName}!`
    );
  });
});
