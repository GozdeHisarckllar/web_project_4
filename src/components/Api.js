class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${err.status} ${err.statusText}`);
  }

  getUserInfo() {
    return fetch(this._baseUrl + "/users/me", { 
        headers: this._headers
      }
    )
    .then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(this._baseUrl + "/cards", { 
        headers: this._headers
      }
    )
    .then(this._handleResponse);
  }
  
  setProfileAvatar({avatar}) {
    return fetch(this._baseUrl + "/users/me/avatar", {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
        })
      }
    )
    .then(this._handleResponse);
  }

  setUserProfileInfo({name, about}) {
    return fetch(this._baseUrl + "/users/me", {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      }
    )
    .then(this._handleResponse);
  }

  addNewCard({name, link}) {
    return fetch(this._baseUrl + "/cards", {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      }
    )
    .then(this._handleResponse);
  }

  removeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
        method: "DELETE",
        headers: this._headers,
      }
    )
    .then(this._handleResponse);
  }

  addCardLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
        method: "PUT",
        headers: this._headers,
      }
    )
    .then(this._handleResponse);
  }

  removeCardLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
        method: "DELETE",
        headers: this._headers,
      }
    )
    .then(this._handleResponse);
  }
}

export default Api;