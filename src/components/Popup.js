class Popup {
  constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('modal_opened');

    document.addEventListener("keyup", this._handleEscClose);
}

  close() {
    this._popupElement.classList.remove('modal_opened');

    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose(evt) {
    evt.preventDefault();

    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
        if (evt.target.classList.contains("modal")) {
          this.close();
        }
    });

    this._popupElement.querySelector(".modal__close-btn").addEventListener("click", () => {
      this.close();
    });
  }
}

export default Popup;