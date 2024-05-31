import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
  it('renders an empty basket', () => {
    render(<Home />);

    const basketButton = screen.getByRole('button', {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent('Basket: 0 items');
  });

  it('renders a basket with 1 item', async () => {
    render(<Home />);

    const addButton = screen.getByRole('button', {
      name: /Item 1/i,
    });

    fireEvent.click(addButton);

    const basketButton = screen.getByRole('button', {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent(/Basket: 1 items/);
  });

  it('renders a basket with 1 of item 1 and 2 of item 2', async () => {
    render(<Home />);

    const AddButtonItem1 = screen.getByRole('button', {
      name: /Item 1/i,
    });
    const AddButtonItem2 = screen.getByRole('button', {
      name: /Item 2/i,
    });

    fireEvent.click(AddButtonItem1);
    fireEvent.click(AddButtonItem2);
    fireEvent.click(AddButtonItem2);

    const basketButton = screen.getByRole('button', {
      name: /Basket:/i,
    });

    expect(basketButton).toHaveTextContent(/Basket: 3 items/);
  });
});
