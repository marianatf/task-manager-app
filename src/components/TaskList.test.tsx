import { TaskList } from "./TaskList";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Priority } from "../types";

describe("TaskList", () => {
  const mockOnDelete = vi.fn();
  const mockOnToggleComplete = vi.fn();
  const mockOnClearCompleted = vi.fn();
  const mockOnCreateTask = vi.fn();

  const mockTasks = [
    {
      id: "1",
      title: "task 1",
      completed: false,
      description: "description",
      priority: "high" as Priority,
    },
    {
      id: "2",
      title: "task 2",
      completed: false,
      description: "description",
      priority: "low" as Priority,
    },
  ];

  it("should match snapshot", () => {
    const { asFragment } = render(
      <TaskList
        tasks={[]}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
        activeCount={0}
        completedCount={0}
        onClearCompleted={mockOnClearCompleted}
        onCreateTask={mockOnCreateTask}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should render all tasks", () => {
    render(
      <TaskList
        tasks={mockTasks}
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
        activeCount={2}
        completedCount={0}
        onClearCompleted={mockOnClearCompleted}
        onCreateTask={mockOnCreateTask}
      />
    );
    expect(screen.getByText("task 1")).toBeInTheDocument();
    expect(screen.getByText("task 2")).toBeInTheDocument();
  });
});
