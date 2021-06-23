class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  
  getUserInfo() {
    
    return fetch(this._baseUrl + "/users/me", { 
        headers: this._headers
      }
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        }//return Promise.reject(res.status); catch((err) => Error+err.status)
      });
  }

  getInitialCards() {
    
    return fetch(this._baseUrl + "/cards", { 
        headers: this._headers
      }
    )
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
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
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    });
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
  .then(res => {
    if (res.ok) {
      return res.json();//function in utils.js
    }
  });
  }

  removeCard(cardId) {
    return fetch(this._baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this._headers,
    }
  )
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  });
  }

  addCardLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      method: "PUT",
      headers: this._headers,
    }
  )
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  });
  }

  removeCardLike(cardId) {
    return fetch(this._baseUrl + "/cards/likes/" + cardId, {
      method: "DELETE",
      headers: this._headers,
    }
  )
  .then(res => {
    if (res.ok) {
      return res.json();
    }
  });
  }
}

export default Api;