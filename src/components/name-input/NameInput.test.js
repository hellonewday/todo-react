import { fireEvent, render, screen } from "@testing-library/react";
import NameInput from "./NameInput";

describe("NameInput component", () => {
  test("test component UI", () => {
    const { container } = render(<NameInput />);
    const submitElement = screen.getByRole("button", {
      name: /create/i,
    });

    const formElement = container.querySelector("div > label ~ input ~ button");

    expect(submitElement).toBeInTheDocument();
    expect(formElement).toBeInTheDocument();
  });

  test("test input validation", () => {
    const { container } = render(<NameInput/>);
    
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
