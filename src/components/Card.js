class Card {
  constructor({ data, handleCardClick, handleRemoveVerify, 
    handleAddCardLike, handleRemoveCardLike }, templateSelector, userInfo) {
    this._name = data.name;
    this._link = data.link;
    this.likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveVerify = handleRemoveVerify;

    this._handleAddCardLike = handleAddCardLike;
    this._handleRemoveCardLike = handleRemoveCardLike;

    this._userInfo = userInfo;
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);
  
    return cardElement;
  }
  
  _handleOpenImagePreview({ name, link }) {
    this._handleCardClick({ name, link });
  }

  activateLikeButton(updatedCardData) {
    this._element.querySelector(".card__like-btn").classList.add("card__like-btn_active");
    this._element.querySelector(".card__like-count").textContent = updatedCardData.likes.length;
  }

  deactivateLikeButton(updatedCardData) {
    this._element.querySelector(".card__like-btn").classList.remove("card__like-btn_active");
    this._element.querySelector(".card__like-count").textContent = updatedCardData.likes.length;
  }

  _isDisplayRemoveButton(userInfo) {
    if (userInfo._id === this._ownerId) {
      this._element.querySelector(".card__remove-btn").classList.add("card__remove-btn_visible");
    }
  }
  removeCard() {
    this._element.remove();
    this._element = null;
  }
  
  _isUserLiked() {
    return this.likes.some((likeInfo) => {
      return likeInfo._id === this._userInfo._id;
    });
  }
  
  _setEventListeners() {
    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._handleOpenImagePreview({ name: this._name, link: this._link });
    });

    this._element.querySelector(".card__like-btn").addEventListener("click", () => {
      if (this._isUserLiked()) {
      this._handleRemoveCardLike(this._id);
    } else {
      this._handleAddCardLike(this._id);
    }
    });

    this._element.querySelector(".card__remove-btn").addEventListener("click", () => {
      this._handleRemoveVerify(this._id);
    });
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._isDisplayRemoveButton(this._userInfo);

    if (this._isUserLiked()) {
      this._element.querySelector(".card__like-btn").classList.add("card__like-btn_active");
    };

    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__like-count').textContent = this.likes.length;
    
    return this._element;
  }
}

  export default Card;