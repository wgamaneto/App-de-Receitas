import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando Done Recipes', () => {
  it('testando componentes na tela', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/done-recipes');
    });
    const doneTitle = screen.getByText('Done Recipes');
    const profileBtn = screen.getByTestId('profile-top-btn');
    const allBtn = screen.getByTestId('filter-by-all-btn');
    const mealBtn = screen.getByTestId('filter-by-meal-btn');
    const drinkBtn = screen.getByTestId('filter-by-drink-btn');
    const image = screen.getByTestId(/horizontal-image/i);
    const name = screen.getByTestId(/horizontal-name/i);
    const text = screen.getByTestId(/horizontal-top-text/i);
    const date = screen.getByTestId(/horizontal-done-date/i);
    const btnCopy = screen.getByTestId('btn-copy');

    expect(doneTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(mealBtn).toBeInTheDocument();
    expect(drinkBtn).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(text).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(btnCopy).toBeInTheDocument();

    userEvent.click(mealBtn);
    userEvent.click(drinkBtn);
    userEvent.click(allBtn);
    userEvent.click(btnCopy);
    // const spanCopy = await screen.findByText('Link copied!');
    // const spanCopy = await screen.findByText(/Link copied!/i, {}, { timeout: 2000 });
    // expect(spanCopy).toBeInTheDocument();
  });

  it('testando copy', async () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/done-recipes');
    });
    document.execCommand = jest.fn();

    const btnCopy = screen.getByTestId('btn-copy');

    userEvent.click(btnCopy);
    const spanCopy = await screen.findByText('Link copied!');
    // const spanCopy = await screen.findByText(/Link copied!/i, {}, { timeout: 2000 });
    expect(spanCopy).toBeInTheDocument();
  });
});
