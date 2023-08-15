import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  cards,
  onCardClick,
  onDeleteCard,
  onCardLike,
  onCardDelete
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className="profile">
        <div className="profile__edit">
          <img src={currentUser.avatar} alt="Фото профиля" className="profile__avatar" />
          <button className="profile__avatar-button" type="button" onClick={onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <div className="profile__data">
            <h1 className="profile__full-name">{currentUser.name}</h1>
            <p className="profile__hobby">{currentUser.about}</p>
          </div>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать профиль"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-ellement"
          type="button"
          aria-label="Добавить карточку"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="places">
        <ul className="places__list">
          {cards.map(card => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onDeleteCard={onDeleteCard}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
