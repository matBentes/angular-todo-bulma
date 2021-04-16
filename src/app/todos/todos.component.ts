import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from '../edit-todo-dialog/edit-todo-dialog.component';
import { DataService } from '../shared/data.service';
import { Todo } from '../shared/todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[];
  showValidationErrors: boolean;

  constructor(private dataService: DataService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.todos = this.dataService.getAllTodos();
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) {
      return (this.showValidationErrors = true);
    }

    this.dataService.addTodo(new Todo(form.value.text));

    this.showValidationErrors = false;
    form.reset();
  }

  toggleClicked(todo: Todo) {
    todo.completed = !todo.completed;
    console.log(todo);
  }

  editTodo(index: number, todo: Todo) {
    // this.todos.indexOf(todo) alternative way

    let dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataService.updateTodo(index, result);
      }
    });
  }

  deleteTodo(index: number) {
    console.log('deleted', index);

    this.dataService.deleteTodo(index);
  }
}
