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
  todo!: Todo;

  update(todo: Todo) {
    this.todoItemStore.updateTodo(todo);
  }

  deleteTodo(todoId: number) {
    this.todoItemStore.deleteTodo(todoId);
  }
}
