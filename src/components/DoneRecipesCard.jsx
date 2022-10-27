import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import copyLink from './services';

function DoneRecipesCard(props) {
  const [isCopied, setIsCopied] = useState(false);
  const { recipe: {
    id,
    type,
    nationality,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  }, index } = props;
  const pathname = `/${type}s/${id}`;

  return (
    <div>
      <Link to={ pathname }>
        <img
          src={ image }
          alt="Imagem Recipe"
          data-testid={ `${index}-horizontal-image` }
          width="10rem"
        />
        <p data-testid={ `${index}-horizontal-name` }>{ name }</p>
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {type === 'meal' ? `${nationality} - ${category}`
          : alcoholicOrNot}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>{ doneDate }</p>
      {tags.map((tagName) => (
        <p
          key={ `${index}-${tagName}` }
          data-testid={ `${index}-${tagName}-horizontal-tag` }
        >
          { tagName }
        </p>
      ))}
      <button
        data-testid="btn-copy"
        type="button"
        onClick={ () => copyLink(pathname, setIsCopied) }
      >
        <span>
          {isCopied ? 'Link copied!' : ''}
        </span>
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share"
          width="30px"
        />
      </button>
    </div>
  );
}

DoneRecipesCard.propTypes = {
  props: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default DoneRecipesCard;
