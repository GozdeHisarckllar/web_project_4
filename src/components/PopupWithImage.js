import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ name, link }) {
    super.open();
    this._popupElement.querySelector(".modal__image").src = link;
    this._popupElement.querySelector(".modal__image").alt = name;
    this._popupElement.querySelector(".modal__image-caption").textContent = name;
  }
}

export default PopupWithImage;