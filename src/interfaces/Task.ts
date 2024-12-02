import { TaskStatus } from "./TaskStatus";
import { User } from "./User.ts";

export interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
  due_date: string | null;
  status_id: number;
  task_status: TaskStatus;
  assigned_to: string | null;
  user: User | null;
  completed: boolean;
}
