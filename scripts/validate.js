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

function toggleButtonState(settings, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
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

enableValidation({
    formSelector: ".form-profile",
    inputSelector: ".form-profile__item",
    submitButtonSelector: ".form-profile__button",
    inactiveButtonClass: "form-profile__button_disabled",
    inputErrorClass: "form-profile__item_type_error",
    errorClass: "form-profile__item-error_visible"
  }); 

  //add style to class css "form-profile__item_type_error" and "form-profile__error_visible"
  //form-profile__button_disabled