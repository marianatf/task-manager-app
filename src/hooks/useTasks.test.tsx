import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTasks } from "./useTasks";

describe("useTasks", () => {
    
  it("should create a task", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.handleCreate("task", "description", "low");
    });
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe("task");
    expect(result.current.tasks[0].description).toBe("description");
    expect(result.current.tasks[0].priority).toBe("low");
  });

  it("should delete a task", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.handleCreate("task 1", "description 1", "low");
      result.current.handleCreate("task 2", "description 2", "high");
    });
    const id = result.current.tasks[0].id;
    act(() => {
      result.current.handleDelete(id);
    });
    expect(result.current.tasks).toHaveLength(1);
    expect(result.current.tasks[0].title).toBe("task 2");
  });

  it("should complete a task", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.handleCreate("task 1", "description 1", "low");
      result.current.handleCreate("task 2", "description 2", "high");
    });
    const id = result.current.tasks[0].id;
    act(() => {
      result.current.handleCompleted(id, false);
    });
    expect(result.current.tasks[0].completed).toBe(true);
  });

  it("should clear all completed tasks", () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.handleCreate("task 1", "description 1", "low");
      result.current.handleCreate("task 2", "description 2", "high");
    });
    const id = result.current.tasks[1].id;
    act(() => {
      result.current.handleCompleted(id, false);
    });
    act(() => {
      result.current.handleClearAllCompleted();
    });
    expect(result.current.tasks).toHaveLength(1);
  });
});
