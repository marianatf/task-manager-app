import React from "react";
import type { ListOfTasks, Priority } from "../types";
import { TaskItem } from "./TaskItem";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props {
  tasks: ListOfTasks;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
  onCreateTask: (title: string, description: string, priority: Priority) => void;
}

export const TaskList: React.FC<Props> = ({
  tasks,
  onDelete,
  onToggleComplete,
  activeCount,
  completedCount,
  onClearCompleted,
  onCreateTask,
}) => {
  const [parent] = useAutoAnimate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200">
        <Header onCreateTask={onCreateTask} />
        <ul className="w-full divide-y divide-gray-200" ref={parent}>
          {[...tasks]
            .sort((a, b) => {
              const priorityOrder = { high: 0, medium: 1, low: 2 };
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            })
            .map((task) => (
              <li key={task.id} className="py-3 px-4">
                <TaskItem
                  id={task.id}
                  key={task.id}
                  title={task.title}
                  completed={task.completed}
                  description={task.description}
                  priority={task.priority}
                  onDelete={onDelete}
                  onToggleComplete={onToggleComplete}
                />
              </li>
            ))}
        </ul>
        <Footer
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={onClearCompleted}
        />
      </div>
    </div>
  );
};
