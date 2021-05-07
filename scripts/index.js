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

const imageDetailModal = document.querySelector('.modal_type_image-detail');
const imageDetailCloseButton = imageDetailModal.querySelector('.modal__close-btn');
const modalImage = imageDetailModal.querySelector('.modal__image');
const modalImageCaption = imageDetailModal.querySelector('.modal__image-caption');

const nameInput = document.querySelector('.form__item_el_name');
const subtitleInput = document.querySelector('.form__item_el_subtitle');
const profileName = document.querySelector('.profile__title-name');
const profileSubtitle = document.querySelector('.profile__subtitle');


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

    enableSubmitButton(settings, editSubmitButton);
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

    if (modalType !== imageDetailModal) { 
      resetValidation(settings, modalType);
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

imageDetailCloseButton.addEventListener('click', () => {
  closeModal(imageDetailModal);
});


const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.cards__list');


function openImageDetailPreview(data) {
    modalImage.src = data.link;
    modalImage.alt = data.name;
    modalImageCaption.textContent = data.name;
      
    openModal(imageDetailModal);
}

function toggleLikeButton(evt) {
    evt.target.classList.toggle('card__like-btn_active');
}

function removeCard(evt) {
    evt.target.closest('.card').remove();
}

function createCard(data) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

    cardImage.style.backgroundImage = `url(${data.link})`;
    cardTitle.textContent = data.name;

  cardElement.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("card__like-btn")) {
      toggleLikeButton(evt);
    }
    else if (evt.target.classList.contains("card__remove-btn")) {
      removeCard(evt);
    }
    else if (evt.target.classList.contains("card__image")) {
      openImageDetailPreview(data);
    }
  });

  return cardElement;
}

function renderCard(card, container) {
    container.prepend(card);
}

initialCards.forEach((data) => {
  const cardElement = createCard(data);

    renderCard(cardElement, cardList);
});

function addNewCard(evt) {
    evt.preventDefault();
    const newCard = {};
    newCard.name = cardTitleInput.value;
    newCard.link = cardLinkInput.value;

    renderCard(createCard(newCard), cardList);
}

formNewCardElement.addEventListener('submit', (evt) => {
    addNewCard(evt);
    closeModal(addCardModal);
});