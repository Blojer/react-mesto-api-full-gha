import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onDeleteCard, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `place__button-like ${isLiked && 'place__button-like_active'}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDelete() {
    onCardDelete(card);
  }
  return (
    <>
      <li className="place">
        <img src={card.link} alt={card.name} className="place__image" onClick={handleClick} />
        <div className="place__block">
          <h2 className="place__title">{card.name}</h2>
          <div className="place__like">
            <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
            <h3 className="place__likes-count">{card.likes.length}</h3>
          </div>
        </div>
        {isOwn && <button className="place__delete" onClick={handleDelete} />}
      </li>
    </>
  );
}

export default Card;
