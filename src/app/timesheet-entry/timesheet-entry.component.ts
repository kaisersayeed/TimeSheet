import {Component, OnInit} from '@angular/core';
import {TimeSheetService} from './services/timesheet.service';
import {Task} from './models/timesheet.model';
import {SelectItem} from "primeng/components/common/selectitem";
import {TaskEditState, TaskCreateState} from "./shared/timesheet.constant";
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

  constructor(private timeSheetService: TimeSheetService) {
  }

  ngOnInit() {
    this.timeSheetService.getDefaultTaskList().then((tasks) => {
      this.tasks = tasks;
    });

    this.taskTypes = this.timeSheetService.getTaskTypes();

    this.cols = [
      {field: 'taskEditState', header: 'State', type: 'readonly'},
      {field: 'title', header: 'Title', type: 'text', getErrorMessage: this.validateTitleField},
      {field: 'type', header: 'Type', type: 'dropdown', optionItems: this.taskTypes},
      {field: 'duration', header: 'Duration', type: 'text', getErrorMessage: this.validateDuration},
      {field: 'hourlyRate', header: 'Hourly Rate', type: 'number', nonEditable: '$'},
      {field: 'total', header: 'Total', type: 'readonly', nonEditable: '$'},
    ];
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

  validateDuration(duration: string): string | null {
    const durationFormatPatten: RegExp = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/g;
    const found: string[] = duration.match(durationFormatPatten);
    return found && found.length > 0 ? null : "provide hh:mm format";
  }

  disableSaveButton(task: Task): boolean {
    const titleFieldValidationError: boolean = this.validateColumn(this.validateTitleField, task.title);
    const durationFieldValidationError: boolean = this.validateColumn(this.validateDuration, task.duration);
    return titleFieldValidationError || durationFieldValidationError;
  }

  validateTitleField(title: string): string | null {
    return title && title !== '' ? null : 'title is required';
  }

  validateColumn(hasAnyErrors: (colValue: string) => string | null, colFieldVal: any) {
    const hasError: string | null = hasAnyErrors(colFieldVal);
    return hasError ? true : false;
  }

  processSave(task: Task) {
    const convertedHour: number = this.convertDurationIntoHours(task.duration);
    task.total = task.hourlyRate * convertedHour;
    task.taskEditState = TaskEditState.Submitted;
    task.taskCreateState = TaskCreateState.Old;
    console.log('submitted   ', task, this.tasks);
  };

  onRowEditSave(task: Task) {
    this.processSave(task);
  }

  onRowDelete(task: Task, index: number) {
    this.removeTask(task);
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.taskId !== task.taskId);
  }

  newRow() {
    let newTask: Task  = {
      title: '',
      type: '',
      duration: '',
      hourlyRate: 250,
      total: 255,
      taskId: uuid.v4(),
      taskEditState: TaskEditState.Active,
      taskCreateState: TaskCreateState.Draft
    };
    return newTask;
  }

}

