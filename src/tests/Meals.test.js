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
    history.push('/meals');
  });
  const bigMac = await screen.findByText('Big Mac');
  expect(bigMac).toBeInTheDocument();
}, 4000);
