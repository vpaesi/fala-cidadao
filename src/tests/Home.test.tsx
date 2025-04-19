import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../pages/Home';

describe('Home', () => {
  it('should render the home page with links', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText('Fazer uma Denúncia')).toBeInTheDocument();
    expect(screen.getByText('Ver denúncias existentes')).toBeInTheDocument();
  });
});