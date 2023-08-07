import { Component, Input } from '@angular/core';
import { Todo } from '../app.component';
import { TodoItemStore } from './todo-item.store';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  standalone: true,
  providers: [TodoItemStore],
  imports: [NgFor, AsyncPipe],
})
export class TodoItemComponent {
  constructor(private todoItemStore: TodoItemStore) {}

  @Input()
  // set todo(todo: Todo) {
  //   this.todoItemStore.patchState({ todo });
  // }
  todo!: Todo;

  update(todo: Todo) {
    this.todoItemStore.updateTodo(todo);
  }

  deleteTodo(todo: Todo) {
    this.todoItemStore.deleteTodo(todo);
  }
}
