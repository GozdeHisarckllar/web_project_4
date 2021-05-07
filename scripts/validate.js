const settings = {  
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__input-error_visible",
  errorMessageSelector: ".form__input-error"
}

function showInputError(settings, formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    
    errorElement.classList.add(settings.errorClass);
    errorElement.textContent = errorMessage;
    
    inputElement.classList.add(settings.inputErrorClass);
}

function hideInputError(settings, formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
    
    inputElement.classList.remove(settings.inputErrorClass);
}

function checkInputValidity(settings, formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(settings, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(settings, formElement, inputElement);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function enableSubmitButton(settings, buttonElement) {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
}

function disableSubmitButton(settings, buttonElement) {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
}

function toggleButtonState(settings, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(settings, buttonElement);
  } else {
    enableSubmitButton(settings, buttonElement);
  }
}

function setEventListeners(settings, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  toggleButtonState(settings, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function() {
      checkInputValidity(settings, formElement, inputElement);
      toggleButtonState(settings, inputList, buttonElement);
    });
  });
}

function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function(evt) {
      evt.preventDefault();
    });

    setEventListeners(settings, formElement);
  })
}

enableValidation(settings);


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