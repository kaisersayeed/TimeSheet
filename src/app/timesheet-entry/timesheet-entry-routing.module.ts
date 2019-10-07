import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimesheetEntryComponent } from './timesheet-entry.component';

const routes: Routes = [
  {
    path: '',
    component: TimesheetEntryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TimesheetEntryRoutingModule { }
