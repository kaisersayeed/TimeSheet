import {Component, OnInit} from '@angular/core';
import {TimeSheetService} from './services/timesheet.service';
import {Task} from './models/timesheet.model';
import {SelectItem} from "primeng/components/common/selectitem";
import {TaskEditState} from "./shared/timesheet.constant";

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

  validateDuration(duration: string): string | null {
    return '';
  }

  validateTitleField(title: string): string | null {
    return '';
  }

  disableSaveButton(task: Task): boolean {
    return false;
  }

  onRowEditInit(task: Task) {
    task.taskEditState = TaskEditState.Active;
  }

  onRowEditSave(task: Task) {

  }

  onRowDelete(task: Task, index: number) {
    this.removeTask(task);
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t.taskId !== task.taskId);
  }

}

