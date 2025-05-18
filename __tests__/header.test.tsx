import "@testing-library/jest-dom";
import { render, screen } from "../node_modules/@testing-library/react"; // adjust if you're using a custom setup
import Header from "../src/components/header/Header";

jest.mock("../src/util/IconCode", () => ({
  getIcon: () => () => <svg data-testid="icon" />,
}));

test("renders icon and temps", () => {
  render(
    <Header
      currentTemp={10}
      highTemp={20}
      lowTemp={5}
      highFeelsLike={0}
      lowFeelsLike={0}
      windSpeed={0}
      precip={0}
      iconCode={1}
    />
  );

  expect(screen.getByText("10")).toBeInTheDocument();
  expect(screen.getByText("20")).toBeInTheDocument();
});
