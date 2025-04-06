import { render, screen } from "@testing-library/react";
import { Header } from "../components/Header";

test("deve renderizar o título corretamente", () => {
  render(<Header />);
  expect(screen.getByText("Fala Cidadão")).toBeInTheDocument();
});