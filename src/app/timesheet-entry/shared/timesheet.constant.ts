export enum TaskTypes {
  TelephoneCall = "Telephone Call",
  Research = "Research",
  DraftingDocument = "Drafting Document"
}

export enum TaskEditState {
  Active = "Active",
  Submitted = "Submitted"
}

export enum TaskCreateState {
  Draft = "Draft",
  Old = "Old"
}

export enum TableFieldNames {
  TaskEditState = "taskEditState",
  Title = 'title',
  Type = 'type',
  Duration = 'duration',
  HourlyRate = 'hourlyRate',
  Total = 'total',
  TaskId = 'taskId',
  TaskCreateState = 'taskCreateState'
}
