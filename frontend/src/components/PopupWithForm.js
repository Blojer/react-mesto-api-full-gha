import Popup from './Popup';
function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onSubmit }) {
  return (
    <Popup isOpen={isOpen} name={name} type={'form'} onClose={onClose}>
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" name={`popup-${name}`} onSubmit={onSubmit} noValidate>
        {children}
        <button type="submit" className="popup__save" name="popup-save-card">
          {buttonText || 'Сохранить'}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
