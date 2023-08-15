import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import api from '../utils/Api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);
  const [isConfirm, setConfirm] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState(null);

  const navigate = useNavigate();

  const checkToken = () => {
      auth
        .getContent()
        .then(data => {
          if (!data) {
            return;
          }
          setIsLoggedIn(true);
          setUserData(data);

          navigate('/', { replace: true });
        })
        .catch(err => {
          setUserData(null);
          setIsLoggedIn(false);
          console.log(err);
        });
  };

  React.useEffect(() => {
    checkToken();
    // eslint-disable-next-line
  }, [isLoggedIn]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setConfirmPopupOpen(false);
    setSelectedCard({ name: '', link: '' });
  };

  const handleCardClick = card => {
    setSelectedCard(card);
  };

  const handleCardLike = card => {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map(c => (c._id === card._id ? newCard : c)));
      })
      .catch(err => console.log(err));
  };

  const handleCardDelete = card => {
    api
      .deleteCard(card._id)
      .then(
        setCards(
          cards.filter(c => {
            return c._id !== card._id;
          })
        )
      )
      .catch(err => console.log(err));
  };

  const handleUpdateAvatar = ({ avatar }) => {
    api
      .editUserAvatar({ avatar })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  const handleUpdateUser = ({ name, about }) => {
    api
      .editUserInfo({ name, about })
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    api
      .getInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch(err => console.log(err));
  }, [isLoggedIn]);

  React.useEffect(() => {
    api
      .getUserData()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
  }, [isLoggedIn]);

  const handleAddPlaceSubmit = ({ name, link }) => {
    api
      .addNewCard({ name, link })
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="background">
          <div className="page">
            <Header userData={userData}  setIsLoggedIn={setIsLoggedIn}/>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <ProtectedRoute
                      element={Main}
                      isLoggedIn={isLoggedIn}
                      onAddPlace={handleAddPlaceClick}
                      onEditAvatar={handleEditAvatarClick}
                      onEditProfile={handleEditProfileClick}
                      cards={cards}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onCardDelete={handleCardDelete}
                    />
                    <Footer />
                  </>
                }
              />
              <Route
                path="/sign-in"
                element={<Login handleLoggedIn={() => setIsLoggedIn(true)} />}
              />
              <Route
                path="/sign-up"
                element={<Register confirm={setConfirm} isOpen={setConfirmPopupOpen} />}
              />
              <Route
                path="*"
                element={<Register confirm={setConfirm} isOpen={setConfirmPopupOpen} />}
              />
            </Routes>

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
            />

            <PopupWithForm
              title={'Вы уверены ?'}
              name={'delete'}
              buttonText={'Да'}
              onClose={closeAllPopups}
            ></PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <InfoTooltip isOpen={isConfirmPopupOpen} confirm={isConfirm} onClose={closeAllPopups} />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
