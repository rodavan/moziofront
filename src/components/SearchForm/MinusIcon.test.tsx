import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MinusIcon from "./MinusIcon";

describe("MinusIcon", () => {
  test("renders MinusIcon component", () => {
    render(<MinusIcon />);
    const minusIcon = screen.getByTestId("minus-icon");
    expect(minusIcon).toBeInTheDocument();
  });
});
