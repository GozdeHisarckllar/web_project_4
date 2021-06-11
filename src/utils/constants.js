export const formSettings = {  
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__input-error_visible",
  errorMessageSelector: ".form__input-error"
}

export const profileSettings = {
  editPopupSelector: ".modal_type_edit-profile",
  nameSelector: ".profile__title-name", 
  subtitleSelector: ".profile__subtitle"
}

export const cardSettings = {
  cardContainerSelector: ".cards__list",
  templateSelector: "#card-template",
  imagePopupSelector: '.modal_type_image-detail',
  addCardPopupSelector: ".modal_type_add-card"
}

export const initialCards = [
    {
      name: 'Yosemite Valley',
      link: 'https://code.s3.yandex.net/web-code/yosemite.jpg'
    },
    {
      name: 'Lake Louise',
      link: 'https://code.s3.yandex.net/web-code/lake-louise.jpg'
    },
    {
      name: 'Bald Mountains',
      link: 'https://code.s3.yandex.net/web-code/bald-mountains.jpg'
    },
    {
      name: 'Latemar',
      link: 'https://code.s3.yandex.net/web-code/latemar.jpg'
    },
    {
      name: 'Vanoise National Park',
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
      name: 'Lago di Braies',
      link: 'https://code.s3.yandex.net/web-code/lago.jpg'
    }
];

export const editProfileModal = document.querySelector('.modal_type_edit-profile');
export const formProfileElement = document.querySelector('.form_type_profile-info');
export const editButton = document.querySelector('.profile__button_type_edit');
export const editSubmitButton = editProfileModal.querySelector(".form__button");

export const formNewCardElement = document.querySelector('.form_type_new-card-info');
export const addCardButton = document.querySelector('.profile__button_type_add');

export const nameInput = document.querySelector('.form__item_el_name');
export const subtitleInput = document.querySelector('.form__item_el_subtitle');