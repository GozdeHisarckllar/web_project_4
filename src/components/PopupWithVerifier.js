import Popup from "./Popup.js";

class PopupWithVerifier extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setRemoveVerifySubmitAction(func) {
    this._handleVerifySubmit = func;
  }
  
  setEventListeners() {
    super.setEventListeners();

    this._popupElement.querySelector(".form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleVerifySubmit();
      this.close();
    });
  }
}

export default PopupWithVerifier;