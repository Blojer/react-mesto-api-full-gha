class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(endpoint, options) {
    return fetch(`${this._url}${endpoint}`, options).then(this._checkResponse);
  }

  getInitialCards() {
    return this._request('/cards', { 
      headers: this._headers,
      credentials: 'include',  
    });
  }

  addNewCard({ name, link }) {
    return this._request('/cards', {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, link }),
      
    });
  }

  editUserInfo({ name, about }) {
    return this._request('/users/me', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ name, about })
    });
  }

  editUserAvatar({ avatar }) {
    return this._request('/users/me/avatar', {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({ avatar })
    });
  }

  getUserData() {
    return this._request('/users/me', { 
      method:'GET',
      credentials: 'include',
      headers: this._headers });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.likeCard(cardId);
    } else {
      return this.dislikeCard(cardId);
    }
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this._headers
    });
  }

  dislikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers
    });
  }
}

const api = new Api({
  baseUrl: 'https://api.blojer.nomoreparties.co',
  headers: {
    authorization: 'ae3dc799-cc96-4703-a737-9448cf4b90b2',
    'Content-Type': 'application/json'
  }
});

export default api;
