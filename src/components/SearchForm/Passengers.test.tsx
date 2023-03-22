import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Passengers from "./Passengers";

describe("Passengers component", () => {
  test("renders and updates passenger count correctly", () => {
    render(<Passengers value={1} />);

    const passengersContainer = screen.getByTestId("passengers-container");
    expect(passengersContainer).toBeInTheDocument();

    const increaseButton = screen.getByTestId("increase-passengers");
    const decreaseButton = screen.getByTestId("decrease-passengers");
    const passengerCount = screen.getByTestId("passenger-count");

    expect(passengerCount.textContent).toBe("1");

    fireEvent.click(increaseButton);
    expect(passengerCount.textContent).toBe("2");

    fireEvent.click(decreaseButton);
    expect(passengerCount.textContent).toBe("1");
  });

  test("decrease button is disabled when passenger count is 0", () => {
    render(<Passengers value={0} />);

    const decreaseButton = screen.getByTestId("decrease-passengers");
    const passengerCount = screen.getByTestId("passenger-count");

    expect(passengerCount.textContent).toBe("0");
    expect(decreaseButton).toBeDisabled();

    fireEvent.click(decreaseButton);
    expect(passengerCount.textContent).toBe("0");
  });

  test("onChange callback is called with correct values", () => {
    const handleChange = jest.fn();
    render(
      <Passengers
        value={1}
        onChange={handleChange}
      />
    );

    const increaseButton = screen.getByTestId("increase-passengers");
    const decreaseButton = screen.getByTestId("decrease-passengers");

    fireEvent.click(increaseButton);
    expect(handleChange).toHaveBeenCalledWith(2);

    fireEvent.click(decreaseButton);
    expect(handleChange).toHaveBeenCalledWith(1);
  });

  test("passenger count updates correctly when value prop changes", async () => {
    const { rerender } = render(<Passengers value={1} />);

    const passengerCount = screen.getByTestId("passenger-count");
    expect(passengerCount.textContent).toBe("1");

    rerender(<Passengers value={3} />);

    await waitFor(() => expect(passengerCount.textContent).toBe("3"));
  });
});
