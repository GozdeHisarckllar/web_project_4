let editButton = document.querySelector('.profile__button_type_edit');
let modal = document.querySelector('.modal');
let closeButton = document.querySelector('.form-profile__close-icon');


editButton.addEventListener('click', function() {
    modal.classList.add('modal_opened');
}
);


closeButton.addEventListener('click', function() {
    modal.classList.toggle('modal_opened');
}
);