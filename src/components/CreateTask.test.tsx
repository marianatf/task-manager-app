import { CreateTask } from "./CreateTask";
import { render, fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("CreateTask", () => {
  const mockAddTask = vi.fn();

  it("should match snapshot", () => {
    const { asFragment } = render(<CreateTask addTask={mockAddTask} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call addTask", () => {
    render(<CreateTask addTask={mockAddTask} />);

    const titleInput = screen.getByPlaceholderText("Add a task");
    fireEvent.focus(titleInput);
    fireEvent.change(titleInput, { target: { value: "task" } });

    const descriptionInput = screen.getByPlaceholderText("Add a description");
    fireEvent.change(descriptionInput, { target: { value: "description" } });

    fireEvent.click(screen.getByText("High"));
    fireEvent.click(screen.getByRole("button", { name: /add/i }));

    expect(mockAddTask).toHaveBeenCalledWith("task", "description", "high");
  });

  it("should show description and priority when title is focused", () => {
    render(<CreateTask addTask={mockAddTask} />);

    const titleInput = screen.getByPlaceholderText("Add a task");
    fireEvent.focus(titleInput);
    const descriptionInput = screen.getByPlaceholderText("Add a description");
    expect(descriptionInput).toBeInTheDocument();
    expect(screen.getByText("Low")).toBeInTheDocument();
    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("should update title and description", () => {
    render(<CreateTask addTask={mockAddTask} />);

    const titleInput = screen.getByPlaceholderText("Add a task");
    fireEvent.focus(titleInput);
    fireEvent.change(titleInput, { target: { value: "task" } });
    expect(titleInput).toHaveValue("task");

    const descriptionInput = screen.getByPlaceholderText("Add a description");
    fireEvent.change(descriptionInput, { target: { value: "description" } });
    expect(descriptionInput).toHaveValue("description");
  });

  it("should change priority when clicked", () => {
    render(<CreateTask addTask={mockAddTask} />);

    const titleInput = screen.getByPlaceholderText("Add a task");
    fireEvent.focus(titleInput);
    const highPriorityBtn = screen.getByText("High");
    fireEvent.click(highPriorityBtn);
    expect(highPriorityBtn.className).toMatch(
      "px-3 py-1 rounded-lg border border-gray-300 transition bg-red-200"
    );
  });

  it("should disable submit button correctly", () => {
    render(<CreateTask addTask={mockAddTask} />);

    const titleInput = screen.getByPlaceholderText("Add a task");
    fireEvent.focus(titleInput);
    const addBtn = screen.getByRole("button", { name: /add/i });
    expect(addBtn).toBeDisabled();

    fireEvent.change(titleInput, { target: { value: "task" } });
    expect(addBtn).toBeDisabled();

    const descriptionInput = screen.getByPlaceholderText("Add a description");
    fireEvent.change(descriptionInput, { target: { value: "description" } });
    expect(addBtn).not.toBeDisabled();
  });
});
