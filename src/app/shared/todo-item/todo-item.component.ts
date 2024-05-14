import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ITodo } from '../../models/todo';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.scss',
})
export class TodoItemComponent {
  @Input({ required: true }) taskDetails!: ITodo;
  @Output() deleteTodoAction = new EventEmitter<number>();
  @Output() editTodoAction = new EventEmitter<ITodo>();

  ngOnInit() {
    console.log('ng-oninit', this.taskDetails);
  }

  deleteTodo(taskId: number) {
    this.deleteTodoAction.emit(taskId);
  }

  editTodo(taskDetails: ITodo) {
    this.editTodoAction.emit(taskDetails);
  }
}
