import { settings, initialCards } from "./data.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const editProfileModal = document.querySelector('.modal_type_edit-profile');
const formProfileElement = document.querySelector('.form_type_profile-info');
const editButton = document.querySelector('.profile__button_type_edit');
const editSubmitButton = editProfileModal.querySelector(".form__button");
const editProfileCloseButton = editProfileModal.querySelector('.modal__close-btn');

const addCardModal = document.querySelector('.modal_type_add-card');
const formNewCardElement = document.querySelector('.form_type_new-card-info');
const addCardButton = document.querySelector('.profile__button_type_add');
const addCardCloseButton = addCardModal.querySelector('.modal__close-btn');
const cardTitleInput = document.querySelector('.form__item_el_card-title');
const cardLinkInput = document.querySelector('.form__item_el_card-link');

const nameInput = document.querySelector('.form__item_el_name');
const subtitleInput = document.querySelector('.form__item_el_subtitle');
const profileName = document.querySelector('.profile__title-name');
const profileSubtitle = document.querySelector('.profile__subtitle');

const profileFormValidator = new FormValidator(settings, formProfileElement);
const newCardFormValidator = new FormValidator(settings, formNewCardElement);

profileFormValidator.enableValidation();
newCardFormValidator.enableValidation();

function submitForm(evt) {
    evt.preventDefault();
    
    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = subtitleInput.value;

    closeModal(editProfileModal);
}

function openFilledForm() {
    nameInput.value = profileName.textContent;
    subtitleInput.value = profileSubtitle.textContent;
    openModal(editProfileModal);

    editSubmitButton.classList.remove(settings.inactiveButtonClass);
    editSubmitButton.removeAttribute("disabled");
}

function handleEscCloseKey(evt) {
  evt.preventDefault();
  const openedModal = document.querySelector(".modal_opened");

    if (evt.key === "Escape") {
      closeModal(openedModal);
    }
}

function handleMouseClose(evt) {
    if (evt.target.classList.contains("modal")) {
      closeModal(evt.target);
    }
}

function openModal(modalType) {
    modalType.classList.add('modal_opened');
    
    document.addEventListener("keyup", handleEscCloseKey);
    modalType.addEventListener("click", handleMouseClose);
}

function closeModal(modalType) {
    modalType.classList.remove('modal_opened');
    
    document.removeEventListener("keyup", handleEscCloseKey);
    modalType.removeEventListener("click", handleMouseClose);

    if (modalType === editProfileModal) {
      profileFormValidator.resetValidation();
    } else if (modalType === addCardModal) {
      newCardFormValidator.resetValidation();
    }
}// also resets validation when closing popups with Esc key and mouse click events.                              

formProfileElement.addEventListener('submit', submitForm);

editButton.addEventListener('click', openFilledForm);

editProfileCloseButton.addEventListener('click', () => {
  closeModal(editProfileModal);
});

addCardButton.addEventListener('click', () => {
  openModal(addCardModal);
});

addCardCloseButton.addEventListener('click', () => {
  closeModal(addCardModal);
});


const cardList = document.querySelector('.cards__list');


function renderCard(cardData, container) {
  const card = new Card(cardData, "#card-template");
  const cardElement = card.generateCard();

  container.prepend(cardElement);
}

initialCards.forEach((item) => {
  renderCard(item, cardList);
});

function addNewCard(evt) {
  evt.preventDefault();
  const newCardData = {};
  newCardData.name = cardTitleInput.value;
  newCardData.link = cardLinkInput.value;

  renderCard(newCardData, cardList);
}

formNewCardElement.addEventListener('submit', (evt) => {
    addNewCard(evt);
    closeModal(addCardModal);
});

export { openModal, closeModal };
