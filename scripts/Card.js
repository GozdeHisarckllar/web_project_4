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
  
  _handleOpenImagePreview() {
    modalImage.src = this._link;
    modalImage.alt = this._name;
    modalImageCaption.textContent = this._name;
  
    openModal(imageDetailModal);
    }
  
  _handleCloseImagePreview() {
    closeModal(imageDetailModal);
  }
  
  _likeCard() {
    this._element.querySelector(".card__like-btn").classList.toggle("card__like-btn_active");
  }
  
  _removeCard() {
    this._element.closest('.card').remove();
  }
  
  _setEventListeners() {
    this._element.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("card__image")) {
        this._handleOpenImagePreview();
      }
      else if (evt.target.classList.contains("card__remove-btn")) {
        this._removeCard();
      }
      else if (evt.target.classList.contains("card__like-btn")) {
        this._likeCard();
      }
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