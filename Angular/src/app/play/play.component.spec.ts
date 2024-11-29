import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayComponent } from './play.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoService } from '../todo.service';

describe('PlayComponent', () => {
  let component: PlayComponent;
  let fixture: ComponentFixture<PlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayComponent ],
      imports: [HttpClientModule],
      providers: [TodoService]
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

});
