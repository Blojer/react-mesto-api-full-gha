import { useNavigate } from 'react-router-dom';
import { useForm } from '../hooks/useForm';
import * as auth from '../utils/auth';
import AuthForm from './AuthForm';

function Login({ handleLoggedIn }) {
  const navigate = useNavigate();
  const { values, handleChange } = useForm({
    email: '',
    password: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    auth
      .authorize(values.password, values.email)
      .then(data => {
        handleLoggedIn();
        navigate('/', { replace: true });
      })
      .catch(err => console.log(err));
  };

  return (
    <AuthForm
      title={'Вход'}
      buttonText={'Войти'}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      email={values.email}
      password={values.password}
    />
  );
}

export default Login;
