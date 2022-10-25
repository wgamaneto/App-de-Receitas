import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

it('Test Login', () => {
  renderWithRouter(
    <App />  
);
  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginBtn = screen.getByTestId('login-submit-btn');

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(loginBtn).toBeInTheDocument();
  userEvent.type(emailInput, 'trybe@outlook.com');
  userEvent.type(passwordInput, '12345678');
  expect(loginBtn).toBeEnabled();
  userEvent.click(loginBtn);
});
