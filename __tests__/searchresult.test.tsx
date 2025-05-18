// __tests__/SearchResult.test.tsx
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { CitySearchType } from "../src/api/APICalls";
import SearchResult from "../src/components/search/SearchResult";

test("renders a result and calls handler on click", () => {
  const handler = jest.fn();
  const items: CitySearchType[] = [
    { id: 1, name: "TestCity", latitude: 10, longitude: 20 },
  ];

  render(<SearchResult searchResult={items} onClickResultHandler={handler} />);

  const cityEl = screen.getByText("TestCity");
  expect(cityEl).toBeInTheDocument();
});
