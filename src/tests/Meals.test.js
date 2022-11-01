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
  // global.fetch = jest.fn(async () => ({
  //   json: async () => meals,
  // }));
  const { history } = renderWithRouter(
    <App />,
  );
  act(() => {
    history.push('/meals');
  });
  // const bigMac = await screen.findByText('Big Mac');
  const bigMac = await screen.findByText(/Big Mac/i, {}, { timeout: 15000 });
  expect(bigMac).toBeInTheDocument();
});

it('testando ingrediente', async () => {
  const { history } = renderWithRouter(
    <App />,
  );
  act(() => {
    history.push('/meals');
  });
  const searchtopbtn = screen.getByTestId(topBtn);
  userEvent.click(searchtopbtn);
  const searchInput = screen.getByTestId(input);
  const execSearchBtn = screen.getByTestId(exc);
  const ingredientBtn = screen.getByTestId('ingredient-search-radio');
  // const nameBtn = screen.getByTestId('name-search-radio');
  // const firstletterBtn = screen.getByTestId('first-letter-search-radio');
  userEvent.click(ingredientBtn);
  userEvent.type(searchInput, 'chicken');
  userEvent.click(execSearchBtn);
  // const BrownStewChicken = await screen.findByText('Brown Stew Chicken');
  const BrownStewChicken = await screen.findByText(/Brown Stew Chicken/i, {}, { timeout: 15000 });
  expect(BrownStewChicken).toBeInTheDocument();
}, 4000);

it('testando name', async () => {
  const { history } = renderWithRouter(
    <App />,
  );
  act(() => {
    history.push('/meals');
  });
  const searchtopbtn = screen.getByTestId(topBtn);
  userEvent.click(searchtopbtn);
  const searchInput = screen.getByTestId(input);
  const execSearchBtn = screen.getByTestId(exc);
  // const ingredientBtn = screen.getByTestId('ingredient-search-radio');
  const nameBtn = screen.getByTestId('name-search-radio');
  // const firstletterBtn = screen.getByTestId('first-letter-search-radio');
  userEvent.click(nameBtn);
  userEvent.type(searchInput, 'soup');
  userEvent.click(execSearchBtn);
  // const LeblebiSoup = await screen.findByText('Leblebi Soup');
  const LeblebiSoup = await screen.findByText(/Leblebi Soup/i, {}, { timeout: 15000 });
  expect(LeblebiSoup).toBeInTheDocument();
}, 4000);

it('testando first', async () => {
  const { history } = renderWithRouter(
    <App />,
  );
  act(() => {
    history.push('/meals');
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
  const AppleFrangipanTart = await screen.findByText(/Apple Frangipan Tart/i, {}, { timeout: 15000 });
  expect(AppleFrangipanTart).toBeInTheDocument();
}, 4000);

// lembrar de testar nome exato levar para rota
