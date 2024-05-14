import { createReducer, on } from '@ngrx/store';
import { ITodo } from '../../models/todo';
import { TodoAction } from './todo.action';

export interface TodoState {
  todos: ITodo[];
  totalTasks: number;
}

export const initialTodoState: TodoState = {
  todos: [],
  totalTasks: 0,
};

export const TodoReducer = createReducer(
  initialTodoState,
  on(TodoAction.listTodos, (state) => {
    const activeTodos = state.todos.filter((t) => t.isDeleted == false);
    return { ...state, todos: activeTodos, totalTasks: activeTodos.length };
  }),
  on(TodoAction.deleteTodos, (state, { taskId }) => {
    const updatedTodos = state.todos.filter((task) => task.id != taskId);
    return { ...state, todos: updatedTodos, totalTasks: updatedTodos.length };
  }),
  on(TodoAction.addTodos, (state, { todo }) => {
    const newTodo: ITodo = {
      id: state.todos.length,
      isDeleted: false,
      status: 'To Do',
      taskName: todo.taskName,
    };
    const updatedTodos = [...state.todos, newTodo];
    return { ...state, todos: updatedTodos, totalTasks: updatedTodos.length };
  }),
  on(TodoAction.updateTodos, (state, { task }) => {
    const updatedTodos = state.todos.map((todo) => {
      return todo.id == task.id ? task : todo;
    });
    console.log('update=', updatedTodos);
    return { ...state, todos: updatedTodos, totalTasks: updatedTodos.length };
  })
);
