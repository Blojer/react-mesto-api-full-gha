import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const textInput = React.useRef('');

  React.useEffect(() => {
    textInput.current.value = '';
  }, [isOpen]);

  const handleSubmit = e => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: textInput.current.value
    });
  };

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'avatar'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input popup__input_type_link-avatar"
        name="avatar"
        id="link-avatar"
        placeholder="Ссылка на картинку"
        required
        ref={textInput}
      />
      <span className="popup__error" id="link-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
