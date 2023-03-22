import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CloseIcon from "./CloseIcon";

describe("CloseIcon", () => {
  test("renders CloseIcon component", () => {
    const { asFragment } = render(<CloseIcon />);
    const closeIcon = screen.getByTestId("close-icon");
    expect(closeIcon).toBeInTheDocument();

    // Snapshot testing
    expect(asFragment()).toMatchSnapshot();
  });
});
