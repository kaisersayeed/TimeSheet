import {Component, OnInit} from '@angular/core';
import {TimeSheetService} from './services/timesheet.service';
import {Task} from './models/timesheet.model';
import {SelectItem} from "primeng/components/common/selectitem";
import {TaskEditState, TaskCreateState, TableFieldNames} from "./shared/timesheet.constant";
import * as uuid from 'uuid';

@Component({
  selector: 'app-timesheet-entry',
  templateUrl: './timesheet-entry.component.html',
  styleUrls: ['./timesheet-entry.component.css']
})
export class TimesheetEntryComponent implements OnInit {
  tasks: Task[];
  taskTypes: SelectItem[];
  cols: any;
  errorMessages: any;
  inProgressDeleteTask: Task | null;

  constructor(private timeSheetService: TimeSheetService) {
    this.inProgressDeleteTask = null;
    this.taskTypes = this.timeSheetService.getTaskTypes();

    this.cols = [
      {field: TableFieldNames.TaskEditState, header: 'State', type: 'readonly'},
      {field: TableFieldNames.Title, header: 'Title', type: 'text', getErrorMessage: this.validateTitleField},
      {field: TableFieldNames.Type, header: 'Type', type: 'dropdown', optionItems: this.taskTypes},
      {field: TableFieldNames.Duration, header: 'Duration', type: 'text', getErrorMessage: this.validateDuration},
      {field: TableFieldNames.HourlyRate, header: 'Hourly Rate', type: 'number', nonEditable: '$'},
      {field: TableFieldNames.Total, header: 'Total', type: 'readonly', nonEditable: '$'},
    ];

    this.initFieldErrors();
  }

  initFieldErrors() {
    this.errorMessages = {};
    this.errorMessages[TableFieldNames.Duration] = 'Provide duration in h:mm or hh:mm format';
    this.errorMessages[TableFieldNames.Title] = 'Title is required';
  }

  ngOnInit() {
    this.timeSheetService.getDefaultTaskList().then((tasks) => {
      this.tasks = tasks;
    });
  }

  convertDurationIntoHours = (duration: String): number => {
    const quarter: number = 0.25;
    const half: number = 0.5;
    const threeFourth: number = 0.75;
    const full: number = 1;

    let splitDuration: string[] = duration.split(':');
    let hour: number = +splitDuration[0] || 0;
    let minute: number = +splitDuration[1] || 0;
    let convertedHour: number = hour;

    if (minute > 0 && minute <= 15) {
      convertedHour = hour + quarter;
    } else if (minute > 15 && minute <= 30) {
      convertedHour = hour + half;
    } else if (minute > 30 && minute <= 45) {
      convertedHour = hour + threeFourth;
    } else if (minute > 45 && minute <= 60) {
      convertedHour = hour + full;
    }
    return convertedHour;
  };

  onRowEditInit(task: Task) {
    task.taskEditState = TaskEditState.Active;
  }

  disableSaveButton(task: Task): boolean {
    const titleFieldValidationError: boolean = this.validateColumn(this.validateTitleField, task.title);
    const durationFieldValidationError: boolean = this.validateColumn(this.validateDuration, task.duration);
    return titleFieldValidationError || durationFieldValidationError;
  }

  validateDuration = (duration: string): string | null => {
    // regex accepts 00:00 to 23:59
    const durationFormatPatten: RegExp = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/g;
    const found: string[] = duration.match(durationFormatPatten);
    return found && found.length > 0 ? null : this.errorMessages[TableFieldNames.Duration];
  };

  validateTitleField = (title: string): string | null => {
    return title && title !== '' ? null : this.errorMessages[TableFieldNames.Title];
  };

  validateColumn(hasAnyErrors: (colValue: string) => string | null, colFieldVal: any) {
    const hasError: string | null = hasAnyErrors(colFieldVal);
    return hasError ? true : false;
  }

  execDelAction(shouldDel: boolean) {
    if (shouldDel) {
      this.removeTask(this.inProgressDeleteTask);
    }
    this.promptForDelete = false;
    this.inProgressDeleteTask = null;
  }

  processSave(task: Task) {
    const convertedHour: number = this.convertDurationIntoHours(task.duration);
    task.total = task.hourlyRate * convertedHour;
    task.taskEditState = TaskEditState.Submitted;
    task.taskCreateState = TaskCreateState.Old;
  };

  onRowEditSave(task: Task) {
    this.processSave(task);
  }

  onRowDelete(task: Task, index: number) {
    this.removeTask(task);
  }

  onRowDelete(task: Task, index: number) {
    this.inProgressDeleteTask = task;
    if (task.taskCreateState === TaskCreateState.Draft) {
      this.removeTask(task);
      this.inProgressDeleteTask = null;
    } else {
      this.promptForDelete = true;
    }
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.taskId !== task.taskId);
  }

  newRow() {
    const newTask: Task | any = {};
    newTask[TableFieldNames.TaskId] = uuid.v4();
    newTask[TableFieldNames.Title] = '';
    newTask[TableFieldNames.Type] = '';
    newTask[TableFieldNames.Duration] = '';
    newTask[TableFieldNames.HourlyRate] = 250;
    newTask[TableFieldNames.Total] = 0;
    newTask[TableFieldNames.TaskEditState] = TaskEditState.Active;
    newTask[TableFieldNames.TaskCreateState] = TaskCreateState.Draft;
    return newTask;
  }

}

