import React from "react";
import { CreateTask } from "./CreateTask";
import type { Priority } from "../types";

interface Props {
  onCreateTask: (title: string, description: string, priority: Priority) => void;
}

export const Header: React.FC<Props> = ({ onCreateTask }) => {
  return (
    <header>
      <h1 className="text-4xl font-bold text-center my-4">To-Do List</h1>
      <CreateTask addTask={onCreateTask} />
    </header>
  );
};
