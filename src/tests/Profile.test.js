import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import RecipeProvider from '../context/RecipeProvider';
import renderWithRouter from './renderWithRouter';
import Profile from '../Pages/Profile';

describe('Testando Profile', () => {
  it('testando componentes na tela', () => {
    renderWithRouter(
      <RecipeProvider>
        <Profile />
      </RecipeProvider>,
    );
    // const pageTitle = screen.getByTestId('page-title');
    const profileBtn = screen.getByTestId('profile-top-btn');
    const doneBtn = screen.getByTestId('profile-done-btn');
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

    expect(profileBtn).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profileLogoutBtn).toBeInTheDocument();

    // clicando no seach pra sumir o input
    // userEvent.click(serachBtn);
    // expect(ingredientSearchRadio).not.toBeInTheDocument();
  });

  it('testando rota profile', () => {
    const { history } = renderWithRouter(
      <RecipeProvider>
        <Profile />
      </RecipeProvider>,
    );
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/profile');
  });

  it('testando rota done recipes', () => {
    const { history } = renderWithRouter(
      <RecipeProvider>
        <Profile />
      </RecipeProvider>,
    );
    const doneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/done-recipes');
  });

  it('testando rota favorites recipes', () => {
    const { history } = renderWithRouter(
      <RecipeProvider>
        <Profile />
      </RecipeProvider>,
    );
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(profileFavoriteBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorite-recipes');
  });

  it('testando rota logout', () => {
    const { history } = renderWithRouter(
      <RecipeProvider>
        <Profile />
      </RecipeProvider>,
    );
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(profileLogoutBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });
});
