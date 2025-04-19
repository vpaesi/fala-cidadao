import { render, screen } from '@testing-library/react';
import { ListaDenuncias } from '../pages/ListaDenuncias';
import { useDenuncias } from '../context/DenunciasContext';

jest.mock('../context/DenunciasContext', () => ({
  useDenuncias: jest.fn(),
}));

describe('ListaDenuncias', () => {
  it('deve exibir as denúncias em ordem decrescente de data', () => {
    (useDenuncias as jest.Mock).mockReturnValue({
      loading: false,
    });
}); });

  it('deve exibir a mensagem de "Nenhuma denúncia registrada ainda" quando não houver denúncias', () => {
    (useDenuncias as jest.Mock).mockReturnValue({
      denuncias: [],
      loading: false,
    });

    render(<ListaDenuncias />);

    expect(screen.getByText('Nenhuma denúncia registrada ainda.')).toBeInTheDocument();
  });
