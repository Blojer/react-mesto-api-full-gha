import React from 'react';
import Popup from './Popup';
import successfully from '../images/successfully.png';
import unsuccessfully from '../images/unsuccessfully.png';

function InfoTooltip({ isOpen, confirm, onClose }) {
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={'info'} type={'info'}>
      <img
        className="popup__image popup__image_type_info"
        src={confirm ? successfully : unsuccessfully}
        alt="Результата операции"
      />
      <h2 className="popup__title-info ">
        {confirm ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}
      </h2>
    </Popup>
  );
}

export default InfoTooltip;
