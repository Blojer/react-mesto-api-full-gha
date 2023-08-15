import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import * as auth from '../utils/auth';
import AuthForm from './AuthForm';

function Register({ confirm, isOpen }) {
  const navigate = useNavigate();

  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });
  const handleSubmit = e => {
    e.preventDefault();
    auth
      .register(values.password, values.email)
      .then(data => {
        navigate('/sign-in', { replace: true });
        confirm(true);
        isOpen(true);
      })
      .catch(err => {
        isOpen(true);
        confirm(false);
        console.log(err);
      });
  };

  return (
    <AuthForm
      title={'Регистрация'}
      buttonText={'Зарегистрироваться'}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      email={values.email}
      password={values.password}
    >
      <h3 className="login-form__subtitle">
        Уже зарегистрированы?{' '}
        <Link className="login-form__link" to="/sign-in">
          Войти
        </Link>
      </h3>
    </AuthForm>
  );
}

export default Register;
