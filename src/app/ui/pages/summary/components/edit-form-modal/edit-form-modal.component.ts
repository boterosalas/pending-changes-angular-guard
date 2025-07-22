import {
  Component,
  OnInit,
  inject,
  ViewChild,
  TemplateRef,
  AfterViewInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Todo, TodoInputValue } from '../../../../../core/models/todos';
import { FormCanDeactivate } from '../../../../../core/guards/pending-changes.guard';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from '../../../../../core/services/todos.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-form-modal',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './edit-form-modal.component.html',
  styleUrl: './edit-form-modal.component.scss',
})
export class EditFormModalComponent
  implements OnInit, AfterViewInit, FormCanDeactivate
{
  @ViewChild('editTodoTemplate') editTodoTemplate!: TemplateRef<any>;
  todoForm!: FormGroup;
  private formMatDialog = inject(MatDialog);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private todosService = inject(TodosService);
  private currentTodo?: Todo;
  dialogRef?: MatDialogRef<any>;

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

  ngAfterViewInit(): void {
    this.dialogRef = this.formMatDialog.open(this.editTodoTemplate, {
      disableClose: true,
      panelClass: 'edit-modal',
    });
    this.dialogRef.backdropClick().subscribe(() => this.closeModal());
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.closeModal();
      }
    });
  }

  closeModal(): void {
    this.router.navigateByUrl('/summary');
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
            this.closeModal();
          },
        });
    }
  }

  hasUnsavedChanges(): boolean {
    return this.todoForm.dirty;
  }
}
7;
