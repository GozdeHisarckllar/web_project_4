import "./index.css";
import {
  formSettings, profileSettings, cardSettings, initialCards, 
  editButton, nameInput, subtitleInput, formProfileElement, 
  formNewCardElement, editSubmitButton, addCardButton 
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";


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
    const newCard = new Card({ 
      data: inputInfo, 
      handleCardClick: (item) => {
        imagePreviewPopup.open(item);
      }}, 
      cardSettings.templateSelector
    );
    const newCardElement = newCard.generateCard();
    defaultcardList.addItem(newCardElement);
  }, 
  resetFormValidation : () => {
    newCardFormValidator.resetValidation();
  }}, 
  cardSettings.addCardPopupSelector
);
// also resets validation when closing popups with Esc key and mouse click events.

addCardPopup.setEventListeners();


const imagePreviewPopup = new PopupWithImage(cardSettings.imagePopupSelector);

imagePreviewPopup.setEventListeners();
                              


editButton.addEventListener('click', () => {
  editProfilePopup.open();

  nameInput.value = profileUserInfo.getUserInfo()["userName"];
  subtitleInput.value = profileUserInfo.getUserInfo()["userSubtitle"];

  editSubmitButton.classList.remove(formSettings.inactiveButtonClass);
  editSubmitButton.removeAttribute("disabled");
});

addCardButton.addEventListener('click', () => {
  addCardPopup.open();
});


const defaultcardList = new Section({ 
  items: initialCards, 
  renderer: (item) => {
    const card = new Card({ 
      data: item,
      handleCardClick: (item) => {
        imagePreviewPopup.open(item);
      }
    }, 
      cardSettings.templateSelector
    );
    const cardElement = card.generateCard();
    defaultcardList.addItem(cardElement);
  }}, 
  cardSettings.cardContainerSelector
);

defaultcardList.renderItems();