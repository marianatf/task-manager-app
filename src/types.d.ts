export interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
  description: string;
  priority: Priority;
}

export type ListOfTasks = TaskItem[];

export type Priority = "low" | "medium" | "high";