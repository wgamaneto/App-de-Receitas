import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RecipeProvider from '../context/RecipeProvider';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';

describe('Testando Header', () => {
  it('Tem os data-testids profile-top-btn, page-title e search-top-btn', () => {
    const { history } = renderWithRouter(
      <RecipeProvider>
        <Header />
      </RecipeProvider>,
    );
    // clicando no search pra renderizar os inputs
    const serachBtn = screen.getByTestId('search-top-btn');
    userEvent.click(serachBtn);

    const ingredientSearchRadio = screen.getByTestId('ingredient-search-radio');
    const nameSearchRadio = screen.getByTestId('name-search-radio');
    const firstLetterSearchRadio = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const execSearchBtn = screen.getByTestId('exec-search-btn');
    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(ingredientSearchRadio).toBeInTheDocument();
    expect(nameSearchRadio).toBeInTheDocument();
    expect(firstLetterSearchRadio).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(execSearchBtn).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(ingredientSearchRadio);
    userEvent.click(nameSearchRadio);
    userEvent.click(firstLetterSearchRadio);
    userEvent.type(searchInput, 'testando');
    userEvent.click(execSearchBtn);

    // clicando no seach pra sumir o input
    userEvent.click(serachBtn);
    expect(ingredientSearchRadio).not.toBeInTheDocument();

    userEvent.click(profileBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/profile');
  });
});
