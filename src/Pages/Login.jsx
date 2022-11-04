import React, { useState } from 'react';
import { useHistory } from 'react-router';
import '../styles/login.css';

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
    <div className="container">
      <div className="content">
        <form>
          <input
            className="login-input"
            type="email"
            id="email-input"
            name="email"
            value={ login.email }
            onChange={ handleChange }
            data-testid="email-input"
            placeholder="Insira seu email"
          />
          <input
            className="login-input"
            type="password"
            id="password-input"
            name="password"
            value={ login.password }
            onChange={ handleChange }
            data-testid="password-input"
            placeholder="insira sua senha"
          />
          <button
            type="button"
            onClick={ handleButton }
            disabled={ disabled }
            data-testid="login-submit-btn"
            className="login-button"

          >
            Enter

          </button>
        </form>
      </div>
    </div>

  );
}
