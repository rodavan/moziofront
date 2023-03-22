import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FormButton from "./FormButton";

describe("FormButton", () => {
  test("renders the button with the correct text", () => {
    render(<FormButton buttonType="normal">Click me</FormButton>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });
  test("handles click events", () => {
    const handleClick = jest.fn();
    render(
      <FormButton
        buttonType="normal"
        onClick={handleClick}
      >
        Click me
      </FormButton>
    );
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  test("disables the button when disabled prop is true", () => {
    render(
      <FormButton
        buttonType="normal"
        disabled
      >
        Click me
      </FormButton>
    );
    expect(screen.getByText("Click me")).toBeDisabled();
  });
  test("renders the button with the correct type", () => {
    render(<FormButton buttonType="submit">Submit</FormButton>);
    expect(screen.getByText("Submit")).toHaveAttribute("type", "submit");
  });
});
