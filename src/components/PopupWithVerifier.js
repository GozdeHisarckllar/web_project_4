import Popup from "./Popup.js";

class PopupWithVerifier extends Popup {
  constructor(/*{ handleRemoveVerifySubmit },*/ popupSelector) {
    super(popupSelector);
    //this.handleRemoveVerifySubmit = handleRemoveVerifySubmit;
    //this._handleVerifySubmit = handleVerifySubmit;
  }

  setRemoveVerifySubmitAction(func) {
    this._handleVerifySubmit = func;
  }
  setEventListeners() {
    super.setEventListeners();

    this._popupElement.querySelector(".form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      //this.handleRemoveVerifySubmit(/*this._card, this._id*/);
      this._handleVerifySubmit();
      this.close();
    });
  }

  open(/*event, cardId*/) {
    super.open();
    //this._id = cardId;
    //this._card = event.target.closest(".card");
  }
}

export default PopupWithVerifier;