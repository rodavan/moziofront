import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PlusIcon from "./PlusIcon";

describe("MinusIcon", () => {
  test("renders PlusIcon component", () => {
    render(<PlusIcon />);
    const minusIcon = screen.getByTestId("plus-icon");
    expect(minusIcon).toBeInTheDocument();
  });
});
