import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, setValues } = useForm({
    name: '',
    description: ''
  });

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      description: currentUser.about
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, isOpen]);

  const handleSubmit = e => {
    e.preventDefault();

    onUpdateUser({
      name: values.name,
      about: values.description
    });
  };
  return (
    <PopupWithForm
      title={'Редактировать профиль'}
      name={'profile'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name"
        name="name"
        id="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        value={values.name || ''}
        onChange={handleChange}
      />
      <span className="popup__error" id="name-error"></span>
      <input
        type="text"
        className="popup__input popup__input_type_hobby"
        name="description"
        id="hobby"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        value={values.description || ''}
        onChange={handleChange}
      />
      <span className="popup__error" id="hobby-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
