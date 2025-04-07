import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "../components/Header";

test("deve renderizar o título corretamente", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  expect(screen.getByText("Fala Cidadão")).toBeInTheDocument();
});