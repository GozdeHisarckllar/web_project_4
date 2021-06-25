class Card {
  constructor({ data, handleCardClick, handleRemoveVerify, 
    handleAddCardLike, handleRemoveCardLike }, templateSelector, userInfo) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
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
    this._likeButton.classList.add("card__like-btn_active");
    this._likeCount.textContent = updatedCardData.likes.length;
  }

  deactivateLikeButton(updatedCardData) {
    this._likeButton.classList.remove("card__like-btn_active");
    this._likeCount.textContent = updatedCardData.likes.length;
  }

  updateCardLikes(updatedCardData) {
    this._likes = updatedCardData.likes;
  }

  _isDisplayRemoveButton(userInfo) {
    if (userInfo._id === this._ownerId) {
      this._removeButton.classList.add("card__remove-btn_visible");
    }
  }
  
  removeCard() {
    this._element.remove();
    this._element = null;
  }
  
  _isUserLiked() {
    return this._likes.some((likeInfo) => {
      return likeInfo._id === this._userInfo._id;
    });
  }
  
  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleOpenImagePreview({ name: this._name, link: this._link });
    });

    this._likeButton.addEventListener("click", () => {
      if (this._isUserLiked()) {
      this._handleRemoveCardLike(this._id);
    } else {
      this._handleAddCardLike(this._id);
    }
    });

    this._removeButton.addEventListener("click", () => {
      this._handleRemoveVerify(this._id);
    });
  }
  
  generateCard() {
    this._element = this._getTemplate();

    this._image = this._element.querySelector('.card__image');
    this._title = this._element.querySelector('.card__title');
    this._likeCount = this._element.querySelector('.card__like-count');
    this._likeButton = this._element.querySelector(".card__like-btn");
    this._removeButton = this._element.querySelector(".card__remove-btn");

    this._setEventListeners();
    this._isDisplayRemoveButton(this._userInfo);

    if (this._isUserLiked()) {
      this._likeButton.classList.add("card__like-btn_active");
    };

    this._image.style.backgroundImage = `url(${this._link})`;
    this._title.textContent = this._name;
    this._likeCount.textContent = this._likes.length;
    
    return this._element;
  }
}

  export default Card;