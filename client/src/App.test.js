import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

test('renders learn more about nile link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn more about nile/i);
  expect(linkElement).toBeInTheDocument();
});
