import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__image");
    this._caption = this._popupElement.querySelector(".modal__image-caption");
  }

  open({ name, link }) {
    super.open();
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
  }
}

export default PopupWithImage;