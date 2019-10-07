export interface Task {
  title: string;
  type: string;
  duration: string;
  hourlyRate: number;
  total: number;
  taskId: number;
  taskEditState: string;
  taskCreateState: string;
}
