import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando Profile', () => {
  it('testando componentes na tela', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/profile');
    });
    const pageTitle = screen.getByText('Profile');
    const profileBtn = screen.getByTestId('profile-top-btn');
    const doneBtn = screen.getByTestId('profile-done-btn');
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

    expect(pageTitle).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(doneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profileLogoutBtn).toBeInTheDocument();
  });

  it('testando rota profile', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/profile');
    });
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/profile');
  });

  it('testando rota done recipes', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/profile');
    });
    const doneBtn = screen.getByTestId('profile-done-btn');
    userEvent.click(doneBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/done-recipes');

    const doneRecipe = screen.getByText('Done Recipes');
    expect(doneRecipe).toBeInTheDocument();
  });

  it('testando rota favorites recipes', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/profile');
    });
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    userEvent.click(profileFavoriteBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/favorite-recipes');
    const favoriteRecipe = screen.getByText('Favorite Recipes');
    expect(favoriteRecipe).toBeInTheDocument();
  });
  it('testando rota logout', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/profile');
    });
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    userEvent.click(profileLogoutBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/');
  });

  it('testando rota meals', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/profile');
    });
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
    const meals = screen.getByText('Meals');
    expect(meals).toBeInTheDocument();
  });

  it('testando rota drinks', () => {
    const { history } = renderWithRouter(
      <App />,
    );
    act(() => {
      history.push('/profile');
    });
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);
    const { pathname } = history.location;

    expect(pathname).toBe('/drinks');
    const drink = screen.getByText('Drinks');
    expect(drink).toBeInTheDocument();
  });
});
