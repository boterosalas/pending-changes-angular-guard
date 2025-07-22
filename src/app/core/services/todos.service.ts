import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todos';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private httpClient: HttpClient) {}

  getTodos() {
    return this.httpClient.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos/'
    );
  }

  getTodoById(id: string) {
    return this.httpClient.get<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`
    );
  }

  postTodoById(todo: Todo) {
    return this.httpClient.post<Todo>(
      `https://jsonplaceholder.typicode.com/todos/`,
      todo
    );
  }
}
