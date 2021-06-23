class Card {
  constructor({ data, handleCardClick, 
    handleRemoveVerify, handleAddCardLike, handleRemoveCardLike }, templateSelector, userInfo) {
    this._name = data.name;
    this._link = data.link;
    this.likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleRemoveVerify = handleRemoveVerify;

    this.handleAddCardLike = handleAddCardLike;
    this.handleRemoveCardLike = handleRemoveCardLike;

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
  
  toggleLikeButton() {//_toggleLike
    this._element.querySelector(".card__like-btn").classList.toggle("card__like-btn_active");
  }

  activateLikeButton(updatedCardData) {
    this._element.querySelector(".card__like-btn").classList.add("card__like-btn_active");
    this._element.querySelector(".card__like-count").textContent = updatedCardData.likes.length;
  }

  deactivateLikeButton(updatedCardData) {
    this._element.querySelector(".card__like-btn").classList.remove("card__like-btn_active");
    this._element.querySelector(".card__like-count").textContent = updatedCardData.likes.length;
  }
  
  displayRemoveButton(/*isTrue*/) {
    /*if (isTrue) {
      this._element.querySelector(".card__remove-btn").classList.add("card__remove-btn_visible");
    }*/
    this._element.querySelector(".card__remove-btn").classList.add("card__remove-btn_visible");
  }

  isDisplayRemoveButton(userInfo) {
    if(userInfo._id === this._ownerId) {
      this.displayRemoveButton();
    }
  }
  removeCard() {//_removeCard
    this._element.remove();
    this._element = null;
  }
  
  _isUserLiked() {
    return this.likes.some((likeInfo) => {
      return likeInfo._id === this._userInfo._id;
    });/*"747710113cb193887067b1d8"*/
  }
  
  _setEventListeners() {
    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._handleOpenImagePreview({ name: this._name, link: this._link });
    });

    this._element.querySelector(".card__like-btn").addEventListener("click", () => {
      //this._toggleLikeButton();
      if (this.likes.some((likeInfo) => {
        return likeInfo._id === this._userInfo._id;})) {
      //this.changeCardLikeStatus(this._element, this._id);
      this.handleRemoveCardLike(this._id);
    } else {
      this.handleAddCardLike(this._id);
    }
    });

    this._element.querySelector(".card__remove-btn").addEventListener("click", (/*evt*/) => {
      this._handleRemoveVerify(/*evt, */this._id);
      /*this._removeCard();*/
    });//this._handleBin()
  }
  
  generateCard() {
    this._element = this._getTemplate();
    //this._displayRemoveButton(isTrue);/********/
    this._setEventListeners();
    if(this.likes.some((likeInfo) => {
      return likeInfo._id === this._userInfo._id;})) {
      this._element.querySelector(".card__like-btn").classList.add("card__like-btn_active");
    }
    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._name;
    this._element.querySelector('.card__like-count').textContent = this.likes.length;
    
    return this._element;
  }
}

  export default Card;