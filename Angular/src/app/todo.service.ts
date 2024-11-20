import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000/todos';  // Update with your backend URL

  constructor(private http: HttpClient) {}

  getTodos(): Observable<any[]> {
    console.log("Get Todo() is running...!")
    return this.http.get<any[]>(this.apiUrl);
  }

  addTodo(todo: { todo: string, completed: boolean, userId: number }): Observable<any> {
    console.log("Addinf todo service is called...!")
    return this.http.post<any>(this.apiUrl, todo);
  }
}
