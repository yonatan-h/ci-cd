import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Search from "../src/components/search/Search";

test("renders static parts of Search", () => {
  render(
    <Search latitude={12} longitude={34} onClickResultHandler={jest.fn()} />
  );

  expect(screen.getByText("Search City")).toBeInTheDocument();

  const searchInput = screen.getByPlaceholderText(
    "Input City - Min 3 Characters"
  );
  expect(searchInput).toBeInTheDocument();
  expect(searchInput).not.toBeDisabled();

  const latInput = screen.getByDisplayValue("12");
  expect(latInput).toBeDisabled();

  const lonInput = screen.getByDisplayValue("34");
  expect(lonInput).toBeDisabled();
});
