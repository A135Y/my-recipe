import { render, screen } from "@testing-library/react";
import App from "./App";
//i want to test that the recipes are imported from the json file correctly

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/My Recipe/i);
  expect(linkElement).toBeInTheDocument();
});
