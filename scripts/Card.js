import { openModal, closeModal } from "./index.js";

const imageDetailModal = document.querySelector('.modal_type_image-detail');
const imageDetailCloseButton = imageDetailModal.querySelector('.modal__close-btn');
const modalImage = imageDetailModal.querySelector('.modal__image');
const modalImageCaption = imageDetailModal.querySelector('.modal__image-caption');


class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }
  
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);
  
    return cardElement;
  }
  
  _handleOpenImagePreview(name, link) {
    modalImage.src = link;
    modalImage.alt = name;
    modalImageCaption.textContent = name;
  
    openModal(imageDetailModal);
  }
  
  _handleCloseImagePreview() {
    closeModal(imageDetailModal);
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
      this._handleOpenImagePreview(this._name, this._link);
    });

    this._element.querySelector(".card__like-btn").addEventListener("click", () => {
      this._toggleLikeButton();
    });

    this._element.querySelector(".card__remove-btn").addEventListener("click", () => {
      this._removeCard();
    });

    imageDetailCloseButton.addEventListener('click', () => {
      this._handleCloseImagePreview();
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