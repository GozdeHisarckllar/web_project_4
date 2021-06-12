class Card {
  constructor({ data, handleCardClick }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

  _toggleLikeButton() {
    this._element.querySelector(".card__like-btn").classList.toggle("card__like-btn_active");
  }
  
  _removeCard() {
    this._element.remove();
    this._element = null;
  }
  
  _setEventListeners() {
    this._element.querySelector(".card__image").addEventListener("click", () => {
      this._handleOpenImagePreview({ name: this._name, link: this._link });
    });

    this._element.querySelector(".card__like-btn").addEventListener("click", () => {
      this._toggleLikeButton();
    });

    this._element.querySelector(".card__remove-btn").addEventListener("click", () => {
      this._removeCard();
    });
  }
  
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
  
    this._element.querySelector('.card__image').style.backgroundImage = `url(${this._link})`;
    this._element.querySelector('.card__title').textContent = this._name;
  
    return this._element;
  }
}

  export default Card;