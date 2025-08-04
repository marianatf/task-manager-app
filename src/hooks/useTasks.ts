import { useEffect, useState } from "react";
import type { ListOfTasks } from "../types";

const TASKS_STORAGE_KEY = "todo-app-tasks";

export const useTasks = (): {
  tasks: ListOfTasks;
  handleClearAllCompleted: () => void;
  handleCompleted: (id: string, completed: boolean) => void;
  handleDelete: (id: string) => void;
  handleCreate: (title: string, description: string, priority: string) => void;
  activeCount: number;
  completedCount: number;
} => {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (id: string) => {
    const newTasks = tasks.filter(
      (task: ListOfTasks[number]) => task.id !== id
    );
    setTasks(newTasks);
  };

  const handleCompleted = (id: string, completed: boolean) => {
    const newTasks = tasks.map((task: ListOfTasks[number]) => {
      if (task.id === id) {
        return { ...task, completed: !completed };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleCreate = (
    title: string,
    description: string,
    priority: string
  ) => {
    const newTask = {
      title,
      id: crypto.randomUUID(),
      completed: false,
      description,
      priority,
    };

    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
  };

  const handleClearAllCompleted = () => {
    const newTasks = tasks.filter(
      (task: ListOfTasks[number]) => !task.completed
    );
    setTasks(newTasks);
  };

  const activeCount = tasks.filter(
    (task: ListOfTasks[number]) => !task.completed
  ).length;
  const completedCount = tasks.length - activeCount;

  return {
    tasks,
    handleClearAllCompleted,
    handleCompleted,
    handleDelete,
    handleCreate,
    activeCount,
    completedCount,
  };
};
