import React, { useState } from 'react';
import { useHistory } from 'react-router';

export default function Login() {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);
  const history = useHistory();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const { email, password } = login;
    setLogin((state) => ({ ...state, [name]: value }));
    const validEmail = email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);
    const minLength = 6;
    const isEmailValid = validEmail;
    const isPasswordValid = password.length >= minLength;
    const enableBtn = isEmailValid && isPasswordValid;
    setDisabled(!enableBtn);
  };

  const handleButton = () => {
    const { email } = login;
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <form>
      <label htmlFor="email-input">
        <p>Email</p>
        <input
          type="email"
          id="email-input"
          name="email"
          value={ login.email }
          onChange={ handleChange }
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password-input">
        <p>Senha</p>
        <input
          type="password"
          id="password-input"
          name="password"
          value={ login.password }
          onChange={ handleChange }
          data-testid="password-input"
        />
      </label>
      <div>
        <button
          type="button"
          onClick={ handleButton }
          disabled={ disabled }
          data-testid="login-submit-btn"

        >
          Enter

        </button>
      </div>
    </form>
  );
}
