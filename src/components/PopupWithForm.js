import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ handleFormSubmit, resetFormValidation }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

    this._resetFormValidation = resetFormValidation;
  }

  _getInputValues() {
    this._formElement = this._popupElement.querySelector(".form");
    this._inputList = this._formElement.querySelectorAll(".form__item");

    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupElement.querySelector(".form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._resetFormValidation();
    this._popupElement.querySelector(".form").reset();
  }
}

export default PopupWithForm;