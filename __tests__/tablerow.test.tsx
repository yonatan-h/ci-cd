import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TableRow from "../src/components/table/TableRow";

jest.mock("../src/util/IconCode", () => ({
  getIcon: () => () => <svg data-testid="icon" />,
}));
jest.mock("../src/util/Date", () => ({
  formatTimestampToDay: () => "Tue",
  formatTimestampToNumericHour: () => "14:00",
}));

test("renders TableRow with date, time, temps, wind & precip", () => {
  render(
    <table>
      <tbody>
        <TableRow
          timestamp={123}
          iconCode={1}
          maxTemp={22}
          feelsLike={21}
          windSpeed={5}
          precip={0.2}
        />
      </tbody>
    </table>
  );

  // formatted day and hour
  expect(screen.getByText("Tue")).toBeInTheDocument();
  expect(screen.getByText("14:00")).toBeInTheDocument();

  // icon renders
  expect(screen.getByTestId("icon")).toBeInTheDocument();

  // temps with degree symbol
  expect(screen.getByText("22°")).toBeInTheDocument();
  expect(screen.getByText("21°")).toBeInTheDocument();

  // wind speed and unit
  expect(screen.getByText("5")).toBeInTheDocument();
  expect(screen.getByText("mph")).toBeInTheDocument();

  // precip and unit
  expect(screen.getByText("0.2")).toBeInTheDocument();
  expect(screen.getByText("in")).toBeInTheDocument();
});
