function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_gallery ${card.link && 'popup_opened'}`}>
      <div className="popup__container">
        <img src={card ? card.link : ''} alt={card ? card.name : ''} className="popup__image" />
        <h3 className="popup__image-header">{card ? card.name : ''}</h3>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
