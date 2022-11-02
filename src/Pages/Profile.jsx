import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const user = localStorage.getItem('user');
  if (!user) localStorage.setItem('user', JSON.stringify({ email: '' }));

  const { email } = JSON.parse(localStorage.getItem('user'));

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main>
      <Header />
      <section>
        <p data-testid="profile-email">{ email }</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes

        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          // onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes

        </button>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Logout

        </button>

      </section>
      <Footer />
    </main>
  );
}

export default Profile;
