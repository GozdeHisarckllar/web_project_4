let editButton = document.querySelector('.profile__button_type_edit');
let modal = document.querySelector('.modal');
let closeButton = document.querySelector('.form-profile__close-icon');
let formElement = document.querySelector('.form-profile');

function toggleModal() {
    modal.classList.toggle('modal_opened');
}

function FormSave(event) {
    event.preventDefault();
    
    let nameInput = document.querySelector('.form-profile__item_el_name');
    let subtitleInput = document.querySelector('.form-profile__item_el_subtitle');

    let profileName = document.querySelector('.profile__title-name');
    let profileSubtitle = document.querySelector('.profile__subtitle');
    
    profileName.textContent = nameInput.value;
    profileSubtitle.textContent = subtitleInput.value;

    toggleModal();
};
editButton.addEventListener('click', toggleModal);


closeButton.addEventListener('click', toggleModal);