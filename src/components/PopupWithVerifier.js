import Popup from "./Popup.js";

class PopupWithVerifier extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".form");
    this._formSubmitButton = this._popupElement.querySelector(".form__button");
  }

  setRemoveVerifySubmitAction(func) {
    this._handleVerifySubmit = func;
  }
  
  renderLoading(isLoading, loadingText) {
    if (isLoading) {
      this._formSubmitButton.textContent = loadingText;
    } else {
      this._formSubmitButton.textContent = "Yes";
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleVerifySubmit();
    });
  }
}

export default PopupWithVerifier;