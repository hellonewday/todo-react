import { render, screen, waitFor } from "@testing-library/react";
import ListPlaceHolder from "./ListPlaceHolder";

describe("List PlaceHolder", () => {
  test("render component UI", () => {
    let mockData = [{ id: 1, title: "test" }];
    render(<ListPlaceHolder data={mockData} />);

    const items = screen.getAllByText("test");

    expect(items.length).toBe(1);
  });

  test("render component with fetching", async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/todos");
    let data = await response.json();

    render(<ListPlaceHolder data={data} />);

    await waitFor(() => {
      data.forEach((element) => {
        expect(screen.getByText(element.title)).toBeInTheDocument();
      });
    });
  });
});
