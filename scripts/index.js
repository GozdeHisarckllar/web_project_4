const editProfileModal = document.querySelector('.modal_type_edit-profile');
const formProfileElement = document.querySelector('.form-profile_type_profile-info');
const editButton = document.querySelector('.profile__button_type_edit');
const editProfileCloseButton = editProfileModal.querySelector('.modal__close-btn');

const addCardModal = document.querySelector('.modal_type_add-card');
const formNewCardElement = document.querySelector('.form-profile_type_new-card-info');
const addCardButton = document.querySelector('.profile__button_type_add');
const addCardCloseButton = addCardModal.querySelector('.modal__close-btn');
const profileCardTitle = document.querySelector('.form-profile__item_el_card-title');
const profileCardLink = document.querySelector('.form-profile__item_el_card-link');

const imageDetailModal = document.querySelector('.modal_type_image-detail');
const imageDetailCloseButton = imageDetailModal.querySelector('.modal__close-btn');
const modalImage = imageDetailModal.querySelector('.modal__image');
const modalImageCaption = imageDetailModal.querySelector('.modal__image-caption');

const nameInput = document.querySelector('.form-profile__item_el_name');
const subtitleInput = document.querySelector('.form-profile__item_el_subtitle');
const profileName = document.querySelector('.profile__title-name');
const profileSubtitle = document.querySelector('.profile__subtitle');

function submitForm(event) {
    event.preventDefault();
    
    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = subtitleInput.value;

    toggleModal(editProfileModal);
}

function openFilledForm() {
    nameInput.value = profileName.textContent;
    subtitleInput.value = profileSubtitle.textContent;
    toggleModal(editProfileModal);
}

function toggleModal(modalType) {
    modalType.classList.toggle('modal_opened');
}

formProfileElement.addEventListener('submit', submitForm);

editButton.addEventListener('click', openFilledForm);

editProfileCloseButton.addEventListener('click', () => {
  toggleModal(editProfileModal);
});

addCardButton.addEventListener('click', () => {
  toggleModal(addCardModal);
});

addCardCloseButton.addEventListener('click', () => {
  toggleModal(addCardModal);
});

imageDetailCloseButton.addEventListener('click', () => {
  toggleModal(imageDetailModal);
});

const initialCards = [
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

const cardTemplate = document.querySelector('#card-template').content;
const cardList = document.querySelector('.cards__list');


function openImageDetailPreview(data) {
  modalImage.src = data.link;
  modalImage.alt = data.name;
  modalImageCaption.textContent = data.name;
    
  toggleModal(imageDetailModal);
}

function createCard(data) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.style.backgroundImage = `url(${data.link})`;
    cardTitle.textContent = data.name;

    cardImage.addEventListener('click', () => {
      openImageDetailPreview(data);
    });

    const cardLikeButton = cardElement.querySelector('.card__like-btn');
    const cardRemoveButton = cardElement.querySelector('.card__remove-btn');

    function toggleLikeButton() {
      cardLikeButton.classList.toggle('card__like-btn_active');
    }

    function removeCard() {
      cardElement.remove();
    }

    cardLikeButton.addEventListener('click', toggleLikeButton);
    
    cardRemoveButton.addEventListener('click', removeCard);

    return cardElement;
}    

function renderCard(card, container) {
  container.prepend(card);
}

initialCards.forEach((data) => {
  const cardElement = createCard(data);

  renderCard(cardElement, cardList);
});

function addNewCard(event) {
  event.preventDefault();
  const newCard = {};
  newCard.name = profileCardTitle.value;
  newCard.link = profileCardLink.value;

  renderCard(createCard(newCard), cardList);

  profileCardTitle.value = "";
  profileCardLink.value = "";
}

formNewCardElement.addEventListener('submit', (event) => {
  toggleModal(addCardModal);
  addNewCard(event);
});
