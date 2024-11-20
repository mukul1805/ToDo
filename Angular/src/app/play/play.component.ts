import { Component } from '@angular/core';
import { TodoService } from '../todo.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent {
  todos: any[] = [];
  newTodo: string = '';
  userId: number = 0;

  constructor(private todoService: TodoService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getTodos();
  }


  getTodos(): void {
    this.todoService.getTodos().subscribe(
      (data) => {
        console.log('Fetched todos:', data);
        this.todos = data;  // Assign fetched todos to the array
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  // Method to add a new todo
  addTodo(): void {
    if (!this.newTodo.trim()) { alert('Todo cannot be empty!'); return;  }

    const todo = {
      todo: this.newTodo,
      completed: false,
      userId: this.userId
    };

    this.todoService.addTodo(todo).subscribe(
      (data) => {
        console.log('Todo added, it adding...:', data);
        this.todos.push(data);  // Add the new todo to the todos array
        this.newTodo = '';  // Clear the input field
      },
      (error) => {
        console.error('Error adding todo:', error);
      }
    );
  }

  markCompleted(todo: any) {
    todo.completed = true;
  }

  get completedTasks() {
    return this.todos.filter((todo) => todo.completed);
  }

  get incompleteTasks() {
    return this.todos.filter((todo) => !todo.completed);
  }

  logout(): void {
    this.authService.logout(); // Clear authentication state
    this.router.navigate(['/login']);
  }

  handleUndoComplete(task: any): void {
    //need to call API and update the value there   //-------------------------------
    console.log('Undo Task:', task);
    this.todos = this.todos.map((t) => {
      if (t.id === task.id) {
        t.completed = false; // Mark the task as incomplete
      }
      return t;
    });
  }

}

