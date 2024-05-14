import { createSelector } from '@ngrx/store';
import { TodoState } from './todo.reducer';
import { ITodo } from '../../models/todo';
import { AppState } from '../app.state';

export const todoSelectState = (state: AppState) => state.todo;

export const selectTodosList = createSelector(
  todoSelectState,
  (state: TodoState) => state.todos
);

export const selectTotalTasks = createSelector(
  todoSelectState,
  (state: TodoState) => state.totalTasks
);
