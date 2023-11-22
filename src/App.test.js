import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  test("add todo", () => {
    render(<App />);
    const input = screen.getByRole("textbox");
    const submitElement = screen.getByRole("button", {
      name: /create/i,
    });
    
    fireEvent.change(input, { target: { value: "hello world" } });
    fireEvent.click(submitElement);

    const listElement = screen.getByText(/hello world/i);
    expect(listElement).toBeInTheDocument();
  });

  test("edit todo", () => {
    const { container } = render(<App />);
    const input = screen.getByRole("textbox");
    const submitElement = screen.getByRole("button", {
      name: /create/i,
    });

    fireEvent.change(input, { target: { value: "hello world" } });
    fireEvent.click(submitElement);

    const editBtn = screen.getByRole("button", {
      name: /edit/i,
    });
    fireEvent.click(editBtn);

    const editInput = container.querySelector(".edit-box");
    fireEvent.change(editInput, { target: { value: "hello global" } });

    const saveBtn = screen.getByRole("button", {
      name: /save/i,
    });
    fireEvent.click(saveBtn);

    const editedElement = screen.getByText(/hello global/i);
    expect(editedElement).toBeInTheDocument();

  });

  test("complete todo", () => {
    const { container } = render(<App />);
    const input = screen.getByRole("textbox");
    const submitElement = screen.getByRole("button", {
      name: /create/i,
    })

    fireEvent.change(input, { target: { value: "hello world" } });
    fireEvent.click(submitElement);

    const completeBtn = container.querySelector(".complete");
    fireEvent.click(completeBtn);

    const uncompletedElem = container.querySelectorAll(".uncompleted");
    expect(uncompletedElem.length).toBe(0);

    const completedElem = container.querySelectorAll(".completed");
    expect(completedElem.length).toBe(1);
  });

  test("delete to do", () => {
    const { container } = render(<App />);
    const input = screen.getByRole("textbox");
    const submitElement = screen.getByRole("button", {
      name: /create/i,
    });
    fireEvent.change(input, { target: { value: "hello world" } });
    fireEvent.click(submitElement);

    const deleteBtn = screen.getByRole('button',{
      name: /x/i
    })
    fireEvent.click(deleteBtn);

    const uncompletedElem = container.querySelectorAll(".uncompleted");
    expect(uncompletedElem.length).toBe(0);

  });
});
