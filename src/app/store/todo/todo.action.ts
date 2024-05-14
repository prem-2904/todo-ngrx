import { createAction, props } from '@ngrx/store';
import { ITodo } from '../../models/todo';

const listTodos = createAction('[App Component] ListTodos');

const addTodos = createAction(
  '[App Component] CreateTodos',
  props<{ todo: ITodo }>()
);

const deleteTodos = createAction(
  '[App Component] DeleteTodos',
  props<{ taskId: number }>()
);

const updateTodos = createAction(
  '[App Component] UpdateTodos',
  props<{ task: ITodo }>()
);

export const TodoAction = {
  listTodos,
  deleteTodos,
  addTodos,
  updateTodos,
};
