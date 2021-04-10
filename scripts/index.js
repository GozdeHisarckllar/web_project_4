let modal = document.querySelector('.modal');
let formElement = document.querySelector('.form-profile');
let editButton = document.querySelector('.profile__button_type_edit');
let closeButton = document.querySelector('.form-profile__close-btn');

let nameInput = document.querySelector('.form-profile__item_el_name');
let subtitleInput = document.querySelector('.form-profile__item_el_subtitle');
let profileName = document.querySelector('.profile__title-name');
let profileSubtitle = document.querySelector('.profile__subtitle');

let heartButton = document.querySelectorAll('.cards__heart-btn');


for (let i = 0; i < heartButton.length; i++) {
    heartButton[i].addEventListener('click', function() {
        heartButton[i].classList.toggle("cards__heart-btn_active");
        heartButton[i].classList.toggle('like-hover');
    }
  );
}

function formSubmit(event) {
    event.preventDefault();
    
    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = subtitleInput.value;

    toggleModal();
}

function toggleModal() {
    modal.classList.toggle('modal_opened');
}

function filledInputOpened() {
    nameInput.value = profileName.textContent;
    subtitleInput.value = profileSubtitle.textContent;
    toggleModal();
}

formElement.addEventListener('submit', formSubmit);

editButton.addEventListener('click', filledInputOpened);

closeButton.addEventListener('click', toggleModal);
