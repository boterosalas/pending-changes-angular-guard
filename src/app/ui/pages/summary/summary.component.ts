import {
  Component,
  ViewChild,
  OnInit,
  inject,
  ChangeDetectorRef,
} from '@angular/core';
import { TodosService } from '../../../core/services/todos.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Todo } from '../../../core/models/todos';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FORM_TYPE } from '../../../core/constants/storage-keys';
import { FORM_TYPE_VALUE } from '../../../core/constants/form-type';
import { CommonModule } from '@angular/common';
import { delay } from 'rxjs';

@Component({
  selector: 'app-summary',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    MatRadioModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent implements OnInit {
  formTypeControl: FormControl = new FormControl(
    localStorage.getItem(FORM_TYPE)
  );
  private todosService = inject(TodosService);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private router = inject(Router);
  selectedTodo: any;

  displayedColumns: string[] = ['position', 'title', 'completed'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  todos: Todo[] = [];
  dataSource = new MatTableDataSource<Todo>(this.todos);

  ngOnInit(): void {
    this.getTodos();
    this.listenFormTypeChanges();
  }

  getTodos() {
    this.todosService.getTodos().subscribe({
      next: (todos: Todo[]) => {
        this.todos = todos;
        this.dataSource.data = todos;
        this.dataSource.paginator = this.paginator;
        this.changeDetectorRef.detectChanges();
      },
    });
  }

  onSelectTodo(row: Todo): void {
    this.selectedTodo = row;
    const formType = localStorage.getItem(FORM_TYPE);
    if (formType === FORM_TYPE_VALUE.modal) {
      this.router.navigateByUrl(`/summary/edit/${row.id}`);
    } else {
      this.router.navigateByUrl(`/edit/${row.id}`);
    }
  }

  addNewTodo() {
    const formType = localStorage.getItem(FORM_TYPE);
    if (formType === FORM_TYPE_VALUE.modal) {
      this.router.navigateByUrl(`/summary/new`);
    } else {
      this.router.navigateByUrl(`/new`);
    }
  }

  listenFormTypeChanges() {
    this.formTypeControl.valueChanges.subscribe((value: string) => {
      localStorage.setItem(FORM_TYPE, value);
    });
  }
}
