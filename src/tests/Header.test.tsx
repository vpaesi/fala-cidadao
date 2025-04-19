import { render, screen, fireEvent } from "@testing-library/react";
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

it('deve remover o usuário do localStorage ao clicar em Sair', () => {
  localStorage.setItem('user', JSON.stringify({ email: 'teste@teste.com' }));
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  const logoutButton = screen.getByText('Sair');
  fireEvent.click(logoutButton);

  expect(localStorage.getItem('user')).toBeNull();
});