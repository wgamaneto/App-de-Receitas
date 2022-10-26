import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from './renderWithRouter';

it('testando componentes na tela', async () => {
  const { history } = renderWithRouter(
    <App />,
  );
  act(() => {
    history.push('/drinks');
  });
  const abc = await screen.findByText('ABC');
  expect(abc).toBeInTheDocument();
}, 4000);
