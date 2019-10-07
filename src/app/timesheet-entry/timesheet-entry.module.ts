import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {TimesheetEntryRoutingModule} from './timesheet-entry-routing.module';
import {TimesheetEntryComponent} from './timesheet-entry.component';

import {TableModule} from 'primeng/table';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from "primeng/dialog";
import { AddRowDirective } from './directives/add-row.directive';

@NgModule({
  declarations: [
    TimesheetEntryComponent,
    AddRowDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    TimesheetEntryRoutingModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    DialogModule,
  ]
})
export class TimesheetEntryModule {
}
