import { render } from "@testing-library/react";
import App from "./App";

import { createRoot } from "react-dom/client";
import { describe, expect, it } from "vitest";

describe("App", () => {
  it("should match snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders without crashing", () => {
    const div = document.createElement("div");
    const root = createRoot(div);
    root.render(<App />);
    root.unmount();
  });

  it("renders taskList correctly", () => {
  const { getByText } = render(<App />);
  expect(getByText(/to-do list/i)).toBeInTheDocument();
});
});
