import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../src/app/page";

describe("Page", () => {
  it("renders a main", () => {
    render(<Page />);

    const heading = screen.getByRole("main");

    expect(heading).toBeInTheDocument();
  });

  it("renders a table", () => {
    render(<Page />);

    const table = screen.getByRole("table");

    expect(table).toBeInTheDocument();
  });
});
