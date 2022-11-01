import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
// import meals from '../../cypress/mocks/meals';

const topBtn = 'search-top-btn';
const input = 'search-input';
const exc = 'exec-search-btn';

it('testando componentes na tela', async () => {
  const { history } = renderWithRouter(
    <App />,
  );
  act(() => {
    history.push('/drinks');
  });
  // const abc = await screen.findByText('ABC');
  const abc = await screen.findByText(/ABC/i, {}, { timeout: 15000 });
  expect(abc).toBeInTheDocument();
});

it('testando ingrediente', async () => {
  const { history } = renderWithRouter(
    <App />,
  );
  act(() => {
    history.push('/drinks');
  });
  const searchtopbtn = screen.getByTestId(topBtn);
  userEvent.click(searchtopbtn);
  const searchInput = screen.getByTestId(input);
  const execSearchBtn = screen.getByTestId(exc);
  const ingredientBtn = screen.getByTestId('ingredient-search-radio');
  // const nameBtn = screen.getByTestId('name-search-radio');
  // const firstletterBtn = screen.getByTestId('first-letter-search-radio');
  userEvent.click(ingredientBtn);
  userEvent.type(searchInput, 'lemon');
  userEvent.click(execSearchBtn);
  // const BrownStewChicken = await screen.findByText('Brown Stew Chicken');
  const BrownStewChicken = await screen.findByText(/A True Amaretto Sour/i, {}, { timeout: 15000 });
  expect(BrownStewChicken).toBeInTheDocument();
});

it('testando name', async () => {
  const { history } = renderWithRouter(
    <App />,
  );
  act(() => {
    history.push('/drinks');
  });
  const searchtopbtn = screen.getByTestId(topBtn);
  userEvent.click(searchtopbtn);
  const searchInput = screen.getByTestId(input);
  const execSearchBtn = screen.getByTestId(exc);
  // const ingredientBtn = screen.getByTestId('ingredient-search-radio');
  const nameBtn = screen.getByTestId('name-search-radio');
  // const firstletterBtn = screen.getByTestId('first-letter-search-radio');
  userEvent.click(nameBtn);
  userEvent.type(searchInput, 'GG');
  userEvent.click(execSearchBtn);
  // const LeblebiSoup = await screen.findByText('Leblebi Soup');
  const GG = await screen.findByText(/GG/i, {}, { timeout: 15000 });
  expect(GG).toBeInTheDocument();
});

it('testando first', async () => {
  const { history } = renderWithRouter(
    <App />,
  );
  act(() => {
    history.push('/drinks');
  });
  const searchtopbtn = screen.getByTestId(topBtn);
  userEvent.click(searchtopbtn);
  const searchInput = screen.getByTestId(input);
  const execSearchBtn = screen.getByTestId(exc);
  // const ingredientBtn = screen.getByTestId('ingredient-search-radio');
  // const nameBtn = screen.getByTestId('name-search-radio');
  const firstletterBtn = screen.getByTestId('first-letter-search-radio');
  userEvent.click(firstletterBtn);
  userEvent.type(searchInput, 'a');
  userEvent.click(execSearchBtn);
  // const AppleFrangipanTart = await screen.findByText('Apple Frangipan Tart');
  const A1 = await screen.findByText(/A1/i, {}, { timeout: 15000 });
  expect(A1).toBeInTheDocument();
});

// lembrar de testar nome exato levar para rota
