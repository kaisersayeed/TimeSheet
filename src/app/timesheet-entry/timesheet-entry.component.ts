import {Component, OnInit} from '@angular/core';
import {TimeSheetService} from './services/timesheet.service';
import {Task} from './models/timesheet.model';

@Component({
  selector: 'app-timesheet-entry',
  templateUrl: './timesheet-entry.component.html',
  styleUrls: ['./timesheet-entry.component.css']
})
export class TimesheetEntryComponent implements OnInit {
  tasks: Task[];
  taskTypes: any;

  constructor(private timeSheetService: TimeSheetService) {
  }

  ngOnInit() {
    this.timeSheetService.getDefaultTaskList().then((tasks) => {
      this.tasks = tasks;
    });

    this.taskTypes = this.timeSheetService.getTaskTypes();
  }
}

