import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'timesheet-entry',
    pathMatch: 'full'
  },
  {
    path: 'timesheet-entry',
    loadChildren: './timesheet-entry/timesheet-entry.module#TimesheetEntryModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
