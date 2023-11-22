import { fireEvent, render, screen } from "@testing-library/react";
import NameInput from "./NameInput";

describe("NameInput component", () => {
  test("component UI", () => {
    render(<NameInput />);
    const submitElement = screen.getByRole("button", {
      name: /create/i,
    });

    expect(submitElement).toBeInTheDocument();
  });

  test("input validation", () => {
    render(<NameInput/>);
    
    const input = screen.getByRole("textbox");
    const submitElement = screen.getByRole("button", {
      name: /create/i,
    });

    fireEvent.change(input, { target: { value: "ab" } });

    fireEvent.click(submitElement);

    const errorMsg = screen.getByText(/invalid input/i);

    expect(errorMsg).toBeInTheDocument();
    
  });
});
