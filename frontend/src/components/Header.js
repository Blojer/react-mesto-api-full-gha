import logo from '../images/logo.svg';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import * as auth from '../utils/auth';

function Header({ userData, setIsLoggedIn }) {
  const navigate = useNavigate();

  const signOut = () => {
    auth.logout();
    setIsLoggedIn(false);
    navigate('/sign-in', { replace: true });
  };
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__navigate">
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />

          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />

          <Route
            path="/"
            element={
              <>
                <h3 className="header__user-email">{userData?.email}</h3>
                <button onClick={signOut} className="header__button-out">
                  Выйти
                </button>
              </>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
