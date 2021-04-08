let editButton = document.querySelector('.profile__button_type_edit');
let modal = document.querySelector('.modal');
let closeButton = document.querySelector('.form-profile__close-icon');

function toggleModal() {
    modal.classList.toggle('modal_opened');
}
editButton.addEventListener('click', toggleModal);


closeButton.addEventListener('click', toggleModal);