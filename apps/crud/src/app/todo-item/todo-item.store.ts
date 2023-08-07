import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { AppService } from '../app.service';
import { AppStore } from '../app.store';
import { Todo } from '../app.component';
import { pipe, switchMap, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoItemStore extends ComponentStore<any> {
  constructor(private todoService: AppService, private todoStore: AppStore) {
    super({});
  }

  readonly todo$ = this.select((state) => state);

  readonly updateTodo = this.effect<Todo>(
    pipe(
      tap(() => console.log()),
      switchMap((todo) =>
        this.todoService.update(todo).pipe(
          tapResponse(
            (todo) => {
              this.todoStore.update(todo);
            },
            (error: unknown) => console.log(error)
          )
        )
      )
    )
  );

  readonly deleteTodo = this.effect(
    pipe(
      switchMap((todo: Todo) =>
        this.todoService
          .delete(todo.id)
          .pipe(tap((todo) => this.todoStore.delete(todo.id)))
      )
    )
  );
}
