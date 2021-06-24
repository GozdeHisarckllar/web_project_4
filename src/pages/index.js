import "./index.css";
import { formSettings, profileSettings, cardSettings } from "../utils/constants.js";
import userToken from "../utils/data.js";
import { createCard } from "../utils/utils.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithVerifier from "../components/PopupWithVerifier";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const formProfileElement = document.querySelector('.form_type_profile-info');
const editButton = document.querySelector(profileSettings.editButtonSelector);
const editSubmitButton = formProfileElement.querySelector(formSettings.submitButtonSelector);
const changeAvatarButton = document.querySelector(profileSettings.changeAvatarButtonSelector);
const formChangeAvatarElement = document.querySelector(".form_type_avatar-info");

const profilePicture = document.querySelector(profileSettings.avatarSelector);
const profileUserName = document.querySelector(profileSettings.nameSelector);
const profileUserAbout = document.querySelector(profileSettings.subtitleSelector);

const formNewCardElement = document.querySelector('.form_type_new-card-info');
const addCardButton = document.querySelector(cardSettings.addCardButtonSelector);

const nameInput = document.querySelector('.form__item_el_name');
const subtitleInput = document.querySelector('.form__item_el_subtitle');


export const api = new Api(userToken);


//////////Form Validation///////////

const profileFormValidator = new FormValidator(formSettings, formProfileElement);
const newCardFormValidator = new FormValidator(formSettings, formNewCardElement);
const changeAvatarFormValidator = new FormValidator(formSettings, formChangeAvatarElement);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();


//////////Updating User profile/////////

const profileUserInfo = new UserInfo({ 
  profileNameSelector: profileSettings.nameSelector, 
  profileSubtitleSelector: profileSettings.subtitleSelector 
});

const editProfilePopup = new PopupWithForm({ 
  handleFormSubmit : (inputInfo) => {
    editProfilePopup.renderLoading(true, "Save", "Saving...");
    api.setUserProfileInfo(inputInfo)
      .then((editedInfo) => {
        profileUserInfo.setUserInfo(editedInfo);
      })
      .then(() => editProfilePopup.close())
      .catch((err) => { 
        console.log(`Error: ${err.status} ${err.statusText}`);
      })
      .finally(() => { 
        editProfilePopup.renderLoading(false, "Save");
      });
  }, 
  resetFormValidation : () => {
    profileFormValidator.resetValidation();
  }},
  profileSettings.editPopupSelector
);

editProfilePopup.setEventListeners();


editButton.addEventListener('click', () => {
  editProfilePopup.open();

  const userInfo = profileUserInfo.getUserInfo();
  nameInput.value = userInfo["name"];
  subtitleInput.value = userInfo["about"];

  profileFormValidator.enableSubmitButton(editSubmitButton);
});


const changeAvatarPopup = new PopupWithForm({
    handleFormSubmit: (avatarInfo) => {
      changeAvatarPopup.renderLoading(true, "Save", "Saving...");
      api.setProfileAvatar(avatarInfo)
        .then((avatarInfo) => {
          profilePicture.style.backgroundImage = `url(${avatarInfo.avatar})`;
        })
        .then(() => changeAvatarPopup.close())
        .catch((err) => { console.log(err); })
        .finally(() => { changeAvatarPopup.renderLoading(false, "Save"); });
    },
    resetFormValidation : () => {
      changeAvatarFormValidator.resetValidation();
    }
  },
  profileSettings.changeAvatarPopupSelector
);

changeAvatarPopup.setEventListeners();

changeAvatarButton.addEventListener("click", () => {
  changeAvatarPopup.open();
});

///////Creating/Rendering Cards and Profile Info/////////

api.getUserInfo()
  .then((info) => {
    const userInfo = info;

    profileUserName.textContent = userInfo.name;
    profileUserAbout.textContent = userInfo.about;
    profilePicture.style.backgroundImage = `url(${userInfo.avatar})`;
    
    return userInfo;
  })
  .then((userInfo) => {
    api.getInitialCards()
      .then((data) => {
        const defaultCardList = new Section({ 
          items: data, 
          renderer: (item) => {
            const defaultCard = createCard(item, imagePreviewPopup, 
              cardSettings.templateSelector, userInfo);
            defaultCardList.addDefaultItem(defaultCard.generateCard());
          }}, 
          cardSettings.cardContainerSelector
        );
        
        defaultCardList.renderItems();

        const addCardPopup = new PopupWithForm({
          handleFormSubmit : (inputInfo) => {
            addCardPopup.renderLoading(true, "Create", "Creating...");
            api.addNewCard(inputInfo)
              .then((cardInfo) => {
                const newCard = createCard(cardInfo, imagePreviewPopup, 
                cardSettings.templateSelector, userInfo);
                defaultCardList.addNewItem(newCard.generateCard());
              })
              .then(() => addCardPopup.close())
              .catch((err) => { console.log(err); })
              .finally(() => { addCardPopup.renderLoading(false, "Create");});
          },
          resetFormValidation : () => {
            newCardFormValidator.resetValidation();
          }}, 
          cardSettings.addCardPopupSelector
        );

        addCardPopup.setEventListeners();

        addCardButton.addEventListener('click', () => {
          addCardPopup.open();
        });
      })
      .catch((err) => { console.log(err); });
  })
  .catch((err) => { console.log(err); });


const imagePreviewPopup = new PopupWithImage(cardSettings.imagePopupSelector);

imagePreviewPopup.setEventListeners();


export const removeVerifierPopup = new PopupWithVerifier(
  ".modal_type_remove-verify"
);

removeVerifierPopup.setEventListeners();