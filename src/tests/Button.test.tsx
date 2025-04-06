import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../components/Button";

describe("Button Component", () => {
  test("deve renderizar o botão com o texto correto", () => {
    render(<Button>Enviar</Button>);
    expect(screen.getByText("Enviar")).toBeInTheDocument();
  });

  test("deve chamar a função onClick ao clicar no botão", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Enviar</Button>);
    const button = screen.getByText("Enviar");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("deve aplicar classes do Tailwind corretamente", () => {
    render(<Button className="bg-blue-500 text-white">Enviar</Button>);
    const button = screen.getByText("Enviar");
    expect(button).toHaveClass("bg-blue-500 text-white");
  });
});