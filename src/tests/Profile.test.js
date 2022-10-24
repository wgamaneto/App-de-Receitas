import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../Pages/Profile';

it('Test Profile', () => {
  render(<Profile />, 'profile');
  const doneBtn = screen.getByTestId('profile-done-btn');
  const favoriteBtn = screen.getByTestId('profile-favorite-btn');
  const logoutBtn = screen.getByTestId('profile-logout-btn');

  expect(doneBtn).toBeInTheDocument();
  expect(favoriteBtn).toBeInTheDocument();
  expect(logoutBtn).toBeInTheDocument();
});

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('test btn', () => {
  it('test btn logout', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    fireEvent.click(getByTestId('profile-logout-btn'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/');
  });

  it('test btn done', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    fireEvent.click(getByTestId('profile-done-btn'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/done-recipes');
  });

  it('test btn favorite', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>,
    );

    fireEvent.click(getByTestId('profile-favorite-btn'));
    expect(mockHistoryPush).toHaveBeenCalledWith('/favorite-recipes');
  });
});
