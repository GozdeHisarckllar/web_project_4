import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ handleFormSubmit, resetFormValidation }, popupSelector) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector(".form");
    this._formSubmitButton = this._popupElement.querySelector(".form__button");
    this._handleFormSubmit = handleFormSubmit;

    this._resetFormValidation = resetFormValidation;
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(".form__item");

    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading, defaultText, loadingText) {
    if (isLoading) {
      this._formSubmitButton.textContent = loadingText;
    } else {
      this._formSubmitButton.textContent = defaultText;
    }
  }

  close() {
    super.close();
    this._resetFormValidation();
    this._formElement.reset();
  }
}

export default PopupWithForm;