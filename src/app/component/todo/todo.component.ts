import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ITodo } from '../../models/todo';
import { TodoAction } from '../../store/todo/todo.action';
import { Store } from '@ngrx/store';
import { TodoState } from '../../store/todo/todo.reducer';
import { selectTodosList } from '../../store/todo/todo.selector';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { TodoItemComponent } from '../../shared/todo-item/todo-item.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    AsyncPipe,
    TodoItemComponent,
    JsonPipe,
    FormsModule,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  store = inject(Store<TodoState>);
  taskName!: string;
  todos$ = this.store.select(selectTodosList);
  btnText: string = 'Add Task';
  isEditFlag: boolean = false;
  editDetails!: ITodo;
  addTodo() {
    const todoPayload: ITodo = {
      id: this.isEditFlag ? this.editDetails.id : 1,
      isDeleted: false,
      status: this.isEditFlag ? this.editDetails.status : 'To Do',
      taskName: this.taskName,
    };
    if (this.isEditFlag) {
      this.store.dispatch(TodoAction.updateTodos({ task: todoPayload }));
      this.btnText = 'Add Task';
      this.isEditFlag = false;
    } else {
      this.store.dispatch(TodoAction.addTodos({ todo: todoPayload }));
    }
    this.taskName = '';
  }

  deleteTodo(id: number) {
    this.store.dispatch(TodoAction.deleteTodos({ taskId: id }));
  }

  editTodo(taskDetails: ITodo) {
    this.taskName = taskDetails.taskName;
    this.btnText = 'Update Task';
    this.isEditFlag = true;
    this.editDetails = taskDetails;
  }

  updateTodo() {}
}
