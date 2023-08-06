import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from './app.component';
import { randText } from '@ngneat/falso';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getAllTodos() {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');
  }

  update(todo: Todo) {
    return this.http.put<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
      JSON.stringify({
        todo: todo.id,
        title: randText(),
        userId: todo.userId,
      }),
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }
    );
  }

  delete(todoId: number) {
    return this.http.delete<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`
    );
  }
}
