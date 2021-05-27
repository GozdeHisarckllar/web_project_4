import { disableSubmitButton } from "./FormValidator.js";

const settings = {  
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__input-error_visible",
  errorMessageSelector: ".form__input-error"
}


function resetValidation(settings, modalType) {
  const formElement = modalType.querySelector(settings.formSelector);
  const errorList = Array.from(formElement.querySelectorAll(settings.errorMessageSelector));
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const submitButton = modalType.querySelector(settings.submitButtonSelector);

  errorList.forEach((errorElement) => {
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  });

  inputList.forEach((inputElement) => {
    inputElement.classList.remove(settings.inputErrorClass);
  });
  
  formElement.reset();
  disableSubmitButton(settings, submitButton);
}

export { settings, resetValidation };