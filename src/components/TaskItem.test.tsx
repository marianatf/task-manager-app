import { TaskItem } from "./TaskItem";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("TaskItem", () => {
  const mockOnDelete = vi.fn();
  const mockOnToggleComplete = vi.fn();

  it("should match snapshot", () => {
    const { asFragment } = render(
      <TaskItem
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
        id={""}
        title={""}
        completed={false}
        description={""}
        priority={"high"}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call onDelete when delete button is clicked", () => {
    render(
      <TaskItem
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
        id={"1"}
        title={"test"}
        completed={false}
        description={""}
        priority={"medium"}
      />
    );

    const deleteBtn = screen.getByRole("button", { name: /×/i });
    fireEvent.click(deleteBtn);
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });

  it("should call onToggleComplete when checkbox is clicked", () => {
    render(
      <TaskItem
        onDelete={mockOnDelete}
        onToggleComplete={mockOnToggleComplete}
        id={"2"}
        title={"test"}
        completed={false}
        description={""}
        priority={"low"}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockOnToggleComplete).toHaveBeenCalledWith("2", false);
  });
});
