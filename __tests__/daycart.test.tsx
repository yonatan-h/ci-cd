import DayCard from "@/components/card/DayCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

jest.mock("../src/util/IconCode", () => ({
  getIcon: () => () => <svg data-testid="icon" />,
}));
jest.mock("../src/util/Date", () => ({
  formatTimestampToDay: () => "Mon",
}));
test("renders degree with degree symbol", () => {
  render(<DayCard iconCode={1} timestamp={123} degree={25} />);
  expect(screen.getByText("25°")).toBeInTheDocument();
  expect(screen.getByTestId("icon")).toBeInTheDocument();
});
