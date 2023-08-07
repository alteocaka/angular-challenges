import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { BehaviorSubject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { provideComponentStore } from '@ngrx/component-store';
import { AppStore } from './app.store';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  providers: [provideComponentStore(AppStore)],
  selector: 'app-root',
  // template: `
  //   <ng-container *ngIf="loading === false">
  // <div *ngFor="let todo of todos$ | async">
  //   {{ todo.title }}
  //   <button (click)="update(todo)">Update</button>
  //   <button (click)="deleteTodo(todo.id)">Delete</button>
  // </div>
  //   </ng-container>
  //   <mat-spinner *ngIf="loading === true"></mat-spinner>
  // `,
  template: `
    <div *ngFor="let todo of todos$ | async">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="deleteTodo(todo.id)">Delete</button>
    </div>
    <mat-spinner *ngIf="loading$ | async as loading"></mat-spinner>
    <p *ngIf="error$ | async as error">{{ error.message }}</p>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  // private todos = new BehaviorSubject<Todo[]>([]);
  // readonly todos$ = this.todos.asObservable();
  // loading = true;

  todos$ = this.appStore.todos$;
  loading$ = this.appStore.loading$;
  error$ = this.appStore.error$;

  constructor(private service: AppService, private appStore: AppStore) {}

  ngOnInit(): void {
    // this.service.getAllTodos().subscribe(
    //   (todos) => {
    //     this.todos.next(todos), (this.loading = false);
    //   },
    //   (error) => {
    //     this.loading = false;
    //     throw Error(error.message);
    //   }
    // );
  }

  update(todo: Todo) {
    // this.service.update(todo).subscribe((todoUpdated: Todo) => {
    //   const todos = this.todos.getValue();

    //   // In order to not mutate data:
    //   const index = todos.findIndex((todo) => todo.id === todoUpdated.id);

    //   if (index !== -1) {
    //     const updatedTodos = [
    //       ...todos.slice(0, index),
    //       todoUpdated,
    //       ...todos.slice(index + 1),
    //     ];
    //     this.todos.next(updatedTodos);
    //   }
    // });
    this.appStore.update(todo);
  }

  deleteTodo(todoId: number) {
    // this.service.delete(todoId).subscribe(() => {
    //   let todos = this.todos.getValue();
    //   todos = todos.filter((todo) => todo.id !== todoId);
    //   this.todos.next(todos);
    // });
    this.appStore.delete(todoId);
  }
}
