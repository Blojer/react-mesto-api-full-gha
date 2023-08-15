import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useForm } from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, setValues } = useForm({ name: '', link: '' });
  React.useEffect(() => {
    setValues({ name: '', link: '' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleSubmit = e => {
    e.preventDefault();

    onAddPlace({
      name: values.name,
      link: values.link
    });
  };

  return (
    <PopupWithForm
      title={'Новое место'}
      name={'place'}
      buttonText={'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name-place"
        name="name"
        id="name-place"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        value={values.name || ''}
        onChange={handleChange}
      />
      <span className="popup__error" id="name-place-error"></span>
      <input
        type="url"
        className="popup__input popup__input_type_link-place"
        name="link"
        id="link"
        placeholder="Ссылка на картинку"
        required
        value={values.link || ''}
        onChange={handleChange}
      />
      <span className="popup__error" id="link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
