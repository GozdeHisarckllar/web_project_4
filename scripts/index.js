let modal = document.querySelector('.modal');
let formElement = document.querySelector('.form-profile');
let editButton = document.querySelector('.profile__button_type_edit');
let closeButton = document.querySelector('.form-profile__close-icon');

let nameInput = document.querySelector('.form-profile__item_el_name');
let subtitleInput = document.querySelector('.form-profile__item_el_subtitle');
let profileName = document.querySelector('.profile__title-name');
let profileSubtitle = document.querySelector('.profile__subtitle');

console.log(editButton);
formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    
    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = subtitleInput.value;

    toggleModal();
   }
);

function toggleModal() {
    modal.classList.toggle('modal_opened');
}

editButton.addEventListener('click', toggleModal);

closeButton.addEventListener('click', toggleModal);