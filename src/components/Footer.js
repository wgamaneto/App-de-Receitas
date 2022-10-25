import React from 'react';
import { Link } from 'react-router-dom';
import drinks from '../images/drinkIcon.svg';
import meals from '../images/mealIcon.svg';
import './Footer.css';

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="footer"
    >
      <Link to="/meals">
        <img src={ meals } alt="Meals" data-testid="meals-bottom-btn" />
      </Link>
      <Link to="/drinks">
        <img src={ drinks } alt="Drinks" data-testid="drinks-bottom-btn" />
      </Link>

    </footer>
  );
}
