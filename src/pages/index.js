import "./index.css";
import { formSettings, profileSettings, cardSettings } from "../utils/constants.js";
//import { initialCards } from "../utils/data.js";
import { createCard, renderUploading } from "../utils/utils.js";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithVerifier from "../components/PopupWithVerifier";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const editProfileModal = document.querySelector('.modal_type_edit-profile');
const formProfileElement = document.querySelector('.form_type_profile-info');
const editButton = document.querySelector('.profile__button_type_edit');
const editSubmitButton = editProfileModal.querySelector(".form__button");//form.querySelector
const changeAvatarButton = document.querySelector(".profile__button_type_avatar");
const formChangeAvatarElement = document.querySelector(".form_type_avatar-info");
const profilePicture = document.querySelector(".profile__avatar-picture");
const changeAvatarSubmitButton = formChangeAvatarElement.querySelector(".form__button");

const formNewCardElement = document.querySelector('.form_type_new-card-info');
const addCardButton = document.querySelector('.profile__button_type_add');
const addCardSubmitButton = formNewCardElement.querySelector(".form__button");

const nameInput = document.querySelector('.form__item_el_name');
const subtitleInput = document.querySelector('.form__item_el_subtitle');


const profileFormValidator = new FormValidator(formSettings, formProfileElement);
const newCardFormValidator = new FormValidator(formSettings, formNewCardElement);
const changeAvatarFormValidator = new FormValidator(formSettings, formChangeAvatarElement);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();

const profileUserInfo = new UserInfo({ 
  profileNameSelector: profileSettings.nameSelector, 
  profileSubtitleSelector: profileSettings.subtitleSelector 
});


const editProfilePopup = new PopupWithForm({ 
  handleFormSubmit : (inputInfo) => {
    renderUploading(true, editSubmitButton, "Save", "Saving...");
    api.setUserProfileInfo(inputInfo)
    .then((editedInfo) => {
      profileUserInfo.setUserInfo(editedInfo);
    })//first update server than get data
    .then(() => editProfilePopup.close())//asynchronous
    .catch((err) => {`Error: ${err.status} ${err.statusText}`})
    .finally(() => { renderUploading(false, editSubmitButton, "Save");});
  }, 
  resetFormValidation : () => {
    profileFormValidator.resetValidation();
  }},
  profileSettings.editPopupSelector
);

editProfilePopup.setEventListeners();


/*const addCardPopup = new PopupWithForm({
  handleFormSubmit : (inputInfo) => {
    api.addNewCard(inputInfo)
    .then((cardInfo) => {
      const newCard = createCard(cardInfo, imagePreviewPopup, 
      cardSettings.templateSelector);
    defaultCardList.addItem(newCard.generateCard());
    });
  },
  resetFormValidation : () => {
    newCardFormValidator.resetValidation();
  }}, 
  cardSettings.addCardPopupSelector
);*/

//addCardPopup.setEventListeners();


const imagePreviewPopup = new PopupWithImage(cardSettings.imagePopupSelector);

imagePreviewPopup.setEventListeners();
                              


editButton.addEventListener('click', () => {
  editProfilePopup.open();

  const userInfo = profileUserInfo.getUserInfo();
  nameInput.value = userInfo["name"];
  subtitleInput.value = userInfo["about"];

  profileFormValidator.enableSubmitButton(editSubmitButton);
});

/*addCardButton.addEventListener('click', () => {
  addCardPopup.open();
});*/

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12",
  headers: {
    authorization: "222743ec-a19f-43d0-bb9f-85b170c2da6b",
    "Content-Type": "application/json"
  }
});
api.getUserInfo()
.then((info) => {
  const userInfo = info;

  document.querySelector(profileSettings.nameSelector).textContent = userInfo.name;/*constants above*/
    document.querySelector(profileSettings.subtitleSelector).textContent = userInfo.about;
    document.querySelector(profileSettings.avatarSelector).style.backgroundImage = `url(${userInfo.avatar})`;
  return userInfo;
})//add createCard() profileset (below) here
.then((userInfo) => {
  api.getInitialCards()
    .then((data) => {
      const defaultCardList = new Section({ 
        items: data, 
        renderer: (item) => {
          const defaultCard = createCard(item, imagePreviewPopup, 
            cardSettings.templateSelector, userInfo);
          defaultCardList.addItem(defaultCard.generateCard());
          /*if (item.owner._id == "747710113cb193887067b1d8") {
              defaultCard.displayRemoveButton(true);
            }*/
            /*api.getUserInfo()
            .then((info) => {defaultCard.isDisplayRemoveButton(info);});*/
            defaultCard.isDisplayRemoveButton(userInfo);
        }}, 
        cardSettings.cardContainerSelector
      );
      defaultCardList.renderItems();
      //catch()

      const addCardPopup = new PopupWithForm({
        handleFormSubmit : (inputInfo) => {//renderUploading/"create")
          renderUploading(true, addCardSubmitButton, "Create", "Creating...");
          api.addNewCard(inputInfo)
          .then((cardInfo) => {
            const newCard = createCard(cardInfo, imagePreviewPopup, 
            cardSettings.templateSelector, userInfo);/*userInfo*/
          defaultCardList.addItem(newCard.generateCard());
          /*newCard.displayRemoveButton(true);*/
          newCard.displayRemoveButton();
          })
          //.then(() => {addCardPopup.close();});asynchronous
          .then(() => addCardPopup.close())
          .catch((err) => {`Error: ${err.status} ${err.statusText}`})
          .finally(() => { renderUploading(false, addCardSubmitButton, "Create");});
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
    });
  });
/*const defaultCardList = new Section({ 
  items: a, 
  renderer: (item) => {
    const defaultCard = createCard(item, imagePreviewPopup, 
      cardSettings.templateSelector);
    defaultCardList.addItem(defaultCard.generateCard());
  }}, 
  cardSettings.cardContainerSelector
);*/

//defaultCardList.renderItems();

/*api.getUserInfo()
  .then(data => {
    document.querySelector(profileSettings.nameSelector).textContent = data.name;
    document.querySelector(profileSettings.subtitleSelector).textContent = data.about;
    document.querySelector(profileSettings.avatarSelector).style.backgroundImage = `url(${data.avatar})`;
  })
  .catch((err) => {
    console.log(`Error: ${err.status} ${err.statusText}`);//error function
  });
*/
  /*api.getInitialCards()
    .then(data => console.log(data));*/
changeAvatarButton.addEventListener("click", () => {
  changeAvatarPopup.open();
});

const changeAvatarPopup = new PopupWithForm({
    handleFormSubmit: (avatarInfo) => {
      renderUploading(true, changeAvatarSubmitButton, "Save", "Saving...");
      api.setProfileAvatar(avatarInfo)
      .then((avatarInfo) => {
        profilePicture.style.backgroundImage = `url(${avatarInfo.avatar})`;
      })
      .then(() => changeAvatarPopup.close())
      .finally(() => { renderUploading(false, changeAvatarSubmitButton, "Save"); });
    },
    resetFormValidation : () => {
      changeAvatarFormValidator.resetValidation();
    },
  },
  profileSettings.changeAvatarPopupSelector
);

changeAvatarPopup.setEventListeners();

//card class => handleBinClick | utils.js 
//new Card(..,handleBin () => { removePopup.open()})
export const removeVerifierPopup = new PopupWithVerifier(/*{
  handleRemoveVerifySubmit: (card, cardId) => {
    
      api.removeCard(cardId)
      .then(() => {card.remove()});
  }
},*/
  ".modal_type_remove-verify"
);

removeVerifierPopup.setEventListeners();