import { Header } from "./Header";
import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("Header", () => {
  const mockOnCreateTask = vi.fn();

  it("should match snapshot", () => {
    const { asFragment } = render(<Header onCreateTask={mockOnCreateTask} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
