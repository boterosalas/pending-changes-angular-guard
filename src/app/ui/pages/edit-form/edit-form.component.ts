import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormCanDeactivate } from '../../../core/guards/pending-changes.guard';
import { Todo } from '../../../core/models/todos';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from '../../../core/services/todos.service';

@Component({
  selector: 'app-edit-form',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './edit-form.component.html',
  styleUrl: './edit-form.component.scss',
})
export class EditFormComponent implements OnInit, FormCanDeactivate {
  todoForm!: FormGroup;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private todosService = inject(TodosService);
  private currentTodo?: Todo;

  ngOnInit(): void {
    this.getIdFromRoute();
  }

  getIdFromRoute() {
    this.activatedRoute.params.subscribe(({ id }) => this.getTodoById(id));
  }

  getTodoById(id: string) {
    if (id) {
      this.todosService.getTodoById(id).subscribe({
        next: (todo: Todo) => {
          this.currentTodo = todo;
          this.initForm();
        },
      });
      return;
    }
    this.currentTodo = {
      id: 0,
      title: '',
      completed: false,
    };
    this.initForm();
  }

  initForm() {
    this.todoForm = new FormGroup({
      title: new FormControl(this.currentTodo?.title, [Validators.required]),
      completed: new FormControl(this.currentTodo?.completed),
    });
  }

  updateTodo() {
    if (this.todoForm.valid) {
      this.todosService
        .postTodoById({
          ...this.currentTodo!,
          title: this.todoForm.controls['title'].value,
          completed: this.todoForm.controls['completed'].value,
        })
        .subscribe({
          next: () => {
            this.todoForm.markAsPristine();
            this.navigateToSummary();
          },
        });
    }
  }

  navigateToSummary() {
    this.router.navigateByUrl('/summary');
  }

  hasUnsavedChanges(): boolean {
    return this.todoForm.dirty;
  }
}
