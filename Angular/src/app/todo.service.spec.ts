import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoService],
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch todos via GET', () => {
    const mockTodos = [
      { id: 1, todo: 'Learn Angular', completed: false, userId: 1 },
      { id: 2, todo: 'Write Unit Tests', completed: true, userId: 1 },
    ];

    service.getTodos().subscribe((todos) => {
      expect(todos.length).toBe(2);
      expect(todos).toEqual(mockTodos);
    });

    const req = httpMock.expectOne('http://localhost:3000/todos');
    expect(req.request.method).toBe('GET');
    req.flush(mockTodos); // Respond with mock data
  });

  it('should add a todo via POST', () => {
    const newTodo = { todo: 'Test Todo', completed: false, userId: 1 };
    const mockResponse = { id: 3, ...newTodo };

    service.addTodo(newTodo).subscribe((todo) => {
      expect(todo).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/todos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newTodo);
    req.flush(mockResponse); // Respond with mock data
  });
});
