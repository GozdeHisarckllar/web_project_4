import "./index.css";
import { formSettings, profileSettings, cardSettings } from "../utils/constants.js";
import { initialCards } from "../utils/data.js";
import createCard from "../utils/utils.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

export const editProfileModal = document.querySelector('.modal_type_edit-profile');
export const formProfileElement = document.querySelector('.form_type_profile-info');
export const editButton = document.querySelector('.profile__button_type_edit');
export const editSubmitButton = editProfileModal.querySelector(".form__button");

export const formNewCardElement = document.querySelector('.form_type_new-card-info');
export const addCardButton = document.querySelector('.profile__button_type_add');

export const nameInput = document.querySelector('.form__item_el_name');
export const subtitleInput = document.querySelector('.form__item_el_subtitle');


const profileFormValidator = new FormValidator(formSettings, formProfileElement);
const newCardFormValidator = new FormValidator(formSettings, formNewCardElement);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();


const profileUserInfo = new UserInfo({ 
  profileNameSelector: profileSettings.nameSelector, 
  profileSubtitleSelector: profileSettings.subtitleSelector 
});


const editProfilePopup = new PopupWithForm({ 
  handleFormSubmit : (inputInfo) => {
    profileUserInfo.setUserInfo(inputInfo);
  }, 
  resetFormValidation : () => {
    profileFormValidator.resetValidation();
  }},
  profileSettings.editPopupSelector
);

editProfilePopup.setEventListeners();


const addCardPopup = new PopupWithForm({
  handleFormSubmit : (inputInfo) => {
    const newCard = createCard(inputInfo, imagePreviewPopup, 
      cardSettings.templateSelector);
    defaultCardList.addItem(newCard.generateCard());
  },
  resetFormValidation : () => {
    newCardFormValidator.resetValidation();
  }}, 
  cardSettings.addCardPopupSelector
);

addCardPopup.setEventListeners();


const imagePreviewPopup = new PopupWithImage(cardSettings.imagePopupSelector);

imagePreviewPopup.setEventListeners();
                              


editButton.addEventListener('click', () => {
  editProfilePopup.open();

  const userInfo = profileUserInfo.getUserInfo();
  nameInput.value = userInfo["userName"];
  subtitleInput.value = userInfo["userSubtitle"];

  profileFormValidator.enableSubmitButton(editSubmitButton);
});

addCardButton.addEventListener('click', () => {
  addCardPopup.open();
});


const defaultCardList = new Section({ 
  items: initialCards, 
  renderer: (item) => {
    const defaultCard = createCard(item, imagePreviewPopup, 
      cardSettings.templateSelector);
    defaultCardList.addItem(defaultCard.generateCard());
  }}, 
  cardSettings.cardContainerSelector
);

defaultCardList.renderItems();