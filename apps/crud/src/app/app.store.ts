import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Todo } from './app.component';
import { AppService } from './app.service';
import { EMPTY, Observable, catchError, pipe, switchMap, tap } from 'rxjs';

interface AppState {
  todos: Todo[];
  loading: boolean;
  error: any;
}

export const initialState: AppState = {
  todos: [],
  loading: false,
  error: null,
};

@Injectable()
export class AppStore extends ComponentStore<any> {
  constructor(private todoService: AppService) {
    super(initialState);
    this.load([]);
  }

  // Selectors:
  readonly todos$: Observable<Todo[]> = this.select((state) => state.todos);
  readonly loading$: Observable<boolean> = this.select(
    (state) => state.loading
  );
  readonly error$: Observable<Error> = this.select((state) => state.error);
  // readonly vm$ = this.select({ todos: this.todos$, loading: this.loading$, error: this.error$ }, { debounce: true });

  // Effects:
  readonly load = this.effect(
    pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap(() =>
        this.todoService.getAllTodos().pipe(
          tap((todos) => {
            this.patchState({ todos, loading: false });
          }),
          catchError((error: Error) => {
            this.patchState({ error: error.message, loading: false });
            return EMPTY;
          })
        )
      )
    )
  );

  readonly delete = this.effect((todoId$: Observable<number>) =>
    todoId$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((id) =>
        this.todoService.delete(id).pipe(
          tap((todo) => {
            this.deleteTodo(todo.id);
          }),
          catchError((error: Error) => {
            console.log(error);
            return EMPTY;
          })
        )
      )
    )
  );

  readonly update = this.effect((todo$: Observable<Todo>) =>
    todo$.pipe(
      tap(() => this.patchState({ loading: true })),
      switchMap((todo) =>
        this.todoService.update(todo).pipe(
          tap((todo) => {
            this.updateTodo(todo);
          }),
          catchError((error: Error) => {
            console.error(error.message);
            return EMPTY;
          })
        )
      )
    )
  );

  // Updater functions:

  updateList = (todos: Todo[], updatedTodo: Todo) => {
    const index = todos.findIndex((todo: Todo) => todo.id === updatedTodo.id);

    if (index !== -1) {
      const updatedTodos = [
        ...todos.slice(0, index),
        updatedTodo,
        ...todos.slice(index + 1),
      ];

      console.log(updatedTodo);
      return updatedTodos;
    }

    return;
  };

  readonly updateTodo = this.updater((state: AppState, updatedTodo: Todo) => ({
    todos: this.updateList(state.todos, updatedTodo),
  }));

  readonly deleteTodo = this.updater((state: AppState, id: number) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
  }));
}
