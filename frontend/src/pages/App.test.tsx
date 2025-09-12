import { render, screen } from "@testing-library/react";
import * as React from "react";

import { App } from "./App";

describe("App", () => {
  it("renders root app container", () => {
    render(<App />);
    expect(screen.getByText(/DragDropDeploy/i)).toBeTruthy();
  });
});
