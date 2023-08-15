export const BASE_URL = 'http://api.blojer.nomoreparties.co';

const checkResponse = res => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

export const register = (password, email) => {
  return request(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ password, email })
  });
};

export const authorize = (password, email) => {
  return request(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ password, email })
  });
};

export const getContent = () => {
  return request(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });
};

export const logout = () => {
  return request(`${BASE_URL}/logout`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });
};
