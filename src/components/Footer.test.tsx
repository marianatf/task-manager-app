import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Footer } from "./Footer";

describe("Footer", () => {
  const mockOnClearCompleted = vi.fn();

  it("should match snapshot", () => {
    const { asFragment } = render(
      <Footer
        activeCount={0}
        completedCount={0}
        onClearCompleted={mockOnClearCompleted}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should call onClearCompleted when clicked", () => {
    render(
      <Footer
        activeCount={1}
        completedCount={1}
        onClearCompleted={mockOnClearCompleted}
      />
    );
    fireEvent.click(screen.getByText(/clear completed/i));
    expect(mockOnClearCompleted).toHaveBeenCalled();
  });
});
