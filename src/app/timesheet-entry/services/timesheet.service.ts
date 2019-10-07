import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Task} from '../models/timesheet.model';
import {TaskTypes} from '../shared/timesheet.constant'


@Injectable({
  providedIn: 'root'
})
export class TimeSheetService {

  constructor(private http: HttpClient) {
  }

  getDefaultTaskList() {
    return this.http.get<any>('assets/tasks.json')
      .toPromise()
      .then(res => <Task[]>res.data)
      .then(data => {
        return data;
      });
  }

  getTaskTypes() {
    return [
      {label: TaskTypes.TelephoneCall, value: TaskTypes.TelephoneCall},
      {label: TaskTypes.Research, value: TaskTypes.Research},
      {label: TaskTypes.DraftingDocument, value: TaskTypes.DraftingDocument}
    ];
  }
}
