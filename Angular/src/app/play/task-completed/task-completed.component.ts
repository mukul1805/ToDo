import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-completed',
  templateUrl: './task-completed.component.html',
  styleUrls: ['./task-completed.component.css']
})
export class TaskCompletedComponent implements OnInit {

  @Input() completedTasks: { id: number; todo: string; completed: boolean }[] = [];
  @Output() undoComplete: EventEmitter<any> = new EventEmitter();

  // Emit the event to the parent to mark the task as incomplete
  onUndoComplete(todo: any) {
    this.undoComplete.emit(todo); // Send the task back to the parent
  }

  constructor() { }

  ngOnInit(): void {
  }

}
