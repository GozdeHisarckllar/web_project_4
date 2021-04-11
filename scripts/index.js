let modal = document.querySelector('.modal');
let formElement = document.querySelector('.form-profile');
let editButton = document.querySelector('.profile__button_type_edit');
let closeButton = document.querySelector('.modal__close-btn');

let nameInput = document.querySelector('.form-profile__item_el_name');
let subtitleInput = document.querySelector('.form-profile__item_el_subtitle');
let profileName = document.querySelector('.profile__title-name');
let profileSubtitle = document.querySelector('.profile__subtitle');

let heartButtons = document.querySelectorAll('.card__heart-btn');

function formSubmit(event) {
    event.preventDefault();
    
    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = subtitleInput.value;

    toggleModal();
}

function filledInputOpened() {
    nameInput.value = profileName.textContent;
    subtitleInput.value = profileSubtitle.textContent;
    toggleModal();
}

function toggleModal() {
    modal.classList.toggle('modal_opened');
}

function toggleLikeActive(event) {
    event.target.classList.toggle("card__heart-btn_active");
    event.target.classList.toggle('like-hover');
}

for (let i = 0; i < heartButtons.length; i++) {
    heartButtons[i].addEventListener('click', toggleLikeActive);
}

formElement.addEventListener('submit', formSubmit);

editButton.addEventListener('click', filledInputOpened);

closeButton.addEventListener('click', toggleModal);
