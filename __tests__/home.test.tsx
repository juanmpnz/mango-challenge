import { render, screen } from '@testing-library/react';
import Home from '../src/app/page';

describe('Home Page', () => { 
  it('renders the Header component', () => {
    render(<Home />);
    const headerElement = screen.getByRole('heading', { name: /mango frontend challenge/i });
    expect(headerElement).toBeInTheDocument();
  });
});