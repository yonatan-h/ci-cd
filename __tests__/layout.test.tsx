import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Layout from "../src/app/layout";

describe("layout", () => {
  it("renders children", () => {
    const { getByText } = render(
      <Layout>
        <p>hello world</p>
      </Layout>
    );

    expect(getByText("hello world")).toBeInTheDocument();
  });
});
