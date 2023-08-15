function AuthForm({ title, buttonText, children, handleSubmit, email, password, handleChange }) {
  return (
    <div className="login-form__body">
      <h2 className="login-form__title">{title}</h2>
      <form className="login-form" name="login" noValidate onSubmit={handleSubmit}>
        <input
          type="email"
          className="login-form__input popup__input_type_name"
          name="email"
          id="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          value={email}
          onChange={handleChange}
        />
        <span className="popup__error" id="name-error"></span>
        <input
          type="password"
          className="login-form__input popup__input_type_hobby"
          name="password"
          id="password"
          placeholder="Пароль"
          required
          value={password}
          onChange={handleChange}
        />
        <span className="popup__error" id="hobby-error"></span>
        <button type="submit" className="login-form__save" name="popup-save-card">
          {buttonText}
        </button>
      </form>
      {children}
    </div>
  );
}

export default AuthForm;
