import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayComponent } from './play.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from '../todo.service';
// import * as jasmine from 'jasmine';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('PlayComponent', () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>

  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ PlayComponent ],
      imports: [HttpClientModule,RouterTestingModule],
      providers:  [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('markCompleted', () => {
    it('should mark todo as completed', () => {
      const todo = { id: 1, todo: 'Test Todo', completed: false };
      component.markCompleted(todo);
      expect(todo.completed).toBe(true);
    });
  });

  it('should return only completed tasks', () => {
    component.todos = [
      { id: 1, todo: 'Task 1', completed: true },
      { id: 2, todo: 'Task 2', completed: false },
      { id: 3, todo: 'Task 3', completed: true },
    ];

    const completed = component.completedTasks;

    expect(completed.length).toBe(2);
    expect(completed).toEqual([
      { id: 1, todo: 'Task 1', completed: true },
      { id: 3, todo: 'Task 3', completed: true },
    ]);
  });

  it('should return only incompleted tasks', () => {
    component.todos = [
      { id: 1, todo: 'Task 1', completed: true },
      { id: 2, todo: 'Task 2', completed: false },
      { id: 3, todo: 'Task 3', completed: true },
    ];

    const completed = component.incompleteTasks;

    expect(completed.length).toBe(1);
    expect(completed).toEqual([
      { id: 2, todo: 'Task 2', completed: false },
    ]);
  });

  it('should call AuthService.logout and navigate to login on logout', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  

});
