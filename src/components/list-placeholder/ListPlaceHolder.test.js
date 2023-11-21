import { getByText, render, screen, waitFor } from "@testing-library/react";
import ListPlaceHolder from "./LIstPlaceHolder";

describe("List PlaceHolder", () => {
  test("render component UI", () => {
    let mockData = [{ id: 1, title: "test" }];
    const { container } = render(<ListPlaceHolder data={mockData} />);

    const items = container.querySelectorAll("div > span");

    expect(items.length).toBe(1);
  });

  test("render component with fetching", async () => {
    let response = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await response.json();

    const { container } = render(<ListPlaceHolder data={data} />);

    await waitFor(() => {
      data.forEach((element) => {
        expect(screen.getByText(element.title)).toBeInTheDocument();
      });
    });

    const items = container.querySelectorAll("div > span");

    expect(items.length).toBe(100);
  });
});
