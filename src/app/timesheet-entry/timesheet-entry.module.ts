import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimesheetEntryRoutingModule } from './timesheet-entry-routing.module';
import { TimesheetEntryComponent } from './timesheet-entry.component';


@NgModule({
  declarations: [
    TimesheetEntryComponent,
  ],
  imports: [
    CommonModule,
    TimesheetEntryRoutingModule,
  ]
})
export class TimesheetEntryModule { }
