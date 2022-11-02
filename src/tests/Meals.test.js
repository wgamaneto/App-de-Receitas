import React from 'react';
import { screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import fetch from '../../cypress/mocks/fetch';
// import meals from '../../cypress/mocks/meals';

const topBtn = 'search-top-btn';
const input = 'search-input';
const exc = 'exec-search-btn';

// jest.setTimeout(30000)
describe('Testando Profile', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
    global.alert = jest.fn();
  });
  it('testando componentes na tela', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });
    // const bigMac = await screen.findByText('Big Mac');
    const bigMac = await screen.findByText(/Big Mac/i, {}, { timeout: 4000 });
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
    userEvent.type(searchInput, 'Chicken');
    const corba = await screen.findByText(/corba/i, {}, { timeout: 4000 });
    expect(corba).toBeInTheDocument();
    userEvent.click(execSearchBtn);
    // const BrownStewChicken = await screen.findByText('Brown Stew Chicken');
    const BrownStewChicken = await screen.findByText(/Brown Stew Chicken/i, {}, { timeout: 4000 });
    expect(BrownStewChicken).toBeInTheDocument();
  });

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

    const nameBtn = screen.getByTestId('name-search-radio');

    userEvent.click(nameBtn);
    userEvent.type(searchInput, 'soup');
    const corba = await screen.findByText(/corba/i, {}, { timeout: 4000 });
    expect(corba).toBeInTheDocument();
    userEvent.click(execSearchBtn);

    const LeblebiSoup = await screen.findByText(/Leblebi Soup/i, {}, { timeout: 4000 });
    expect(LeblebiSoup).toBeInTheDocument();
  });

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
    // const execSearchBtn = screen.getByTestId(exc);
    const firstletterBtn = screen.getByTestId('first-letter-search-radio');
    userEvent.click(firstletterBtn);
    userEvent.type(searchInput, 'a');
    const corba = await screen.findByText(/corba/i, {}, { timeout: 4000 });
    expect(corba).toBeInTheDocument();
    // userEvent.click(execSearchBtn);
    // const AppleFrangipanTart = await screen.findByText(/Apple Frangipan Tart/i, {}, { timeout: 4000 });
    // expect(AppleFrangipanTart).toBeInTheDocument();
  });

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
    const nameBtn = screen.getByTestId('name-search-radio');
    userEvent.click(nameBtn);
    userEvent.type(searchInput, 'xablau');
    const corba = await screen.findByText(/corba/i, {}, { timeout: 4000 });
    expect(corba).toBeInTheDocument();
    userEvent.click(execSearchBtn);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    });
  });

  it('testando categoty beef', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });
    const beefBtn = await screen.findByTestId('Beef-category-filter', {}, { timeout: 4000 });
    const corba = await screen.findByText(/corba/i, {}, { timeout: 4000 });
    expect(corba).toBeInTheDocument();
    userEvent.click(beefBtn);
    const beef = await screen.findByText('Beef and Mustard Pie', {}, { timeout: 4000 });
    expect(beef).toBeInTheDocument();
  });

  it('testando categoty breakfast', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });
    const breakBtn = await screen.findByTestId('Breakfast-category-filter', {}, { timeout: 4000 });
    const corba = await screen.findByText(/corba/i, {}, { timeout: 4000 });
    expect(corba).toBeInTheDocument();
    userEvent.click(breakBtn);
    const breakfast = await screen.findByText('Breakfast Potatoes', {}, { timeout: 4000 });
    expect(breakfast).toBeInTheDocument();
  });

  it('testando categoty Chicken', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });
    const chickenBtn = await screen.findByTestId('Chicken-category-filter', {}, { timeout: 4000 });
    const corba = await screen.findByText(/corba/i, {}, { timeout: 4000 });
    expect(corba).toBeInTheDocument();
    userEvent.click(chickenBtn);
    const chiken = await screen.findByText('Brown Stew Chicken', {}, { timeout: 4000 });
    expect(chiken).toBeInTheDocument();
  });

  it('testando categoty Dessert', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });
    const dessertBtn = await screen.findByTestId('Dessert-category-filter', {}, { timeout: 4000 });
    const corba = await screen.findByText(/corba/i, {}, { timeout: 4000 });
    expect(corba).toBeInTheDocument();
    userEvent.click(dessertBtn);
    const Apple = await screen.findByText('Apple & Blackberry Crumble', {}, { timeout: 4000 });
    expect(Apple).toBeInTheDocument();
  });

  it('testando categoty Goat', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/meals');
    });
    const goatBtn = await screen.findByTestId('Goat-category-filter', {}, { timeout: 4000 });
    const corbaa = await screen.findByText('Corba', {}, { timeout: 4000 });
    expect(corbaa).toBeInTheDocument();
    userEvent.click(goatBtn);
    const Goat = await screen.findByText('Mbuzi Choma (Roasted Goat)', {}, { timeout: 4000 });
    expect(Goat).toBeInTheDocument();
    const allBtn = await screen.findByTestId('All-category-filter');
    userEvent.click(allBtn);
    const corba = await screen.findByText('Corba', {}, { timeout: 4000 });
    expect(corba).toBeInTheDocument();
  });
});
