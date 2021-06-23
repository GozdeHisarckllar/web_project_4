import Card from "../components/Card.js";
import { removeVerifierPopup } from "../pages/index.js";
import { api } from "../pages/index.js";

export const createCard = (itemInfo, popupClass, templateSelector, userInfo) => {
  const card = new Card({//index.js new Card
    data: itemInfo, 
    handleCardClick: (item) => {
      popupClass.open(item);
    },
    handleRemoveVerify: (/*event, */cardId) => {
      removeVerifierPopup.open(/*event, cardId*/);
      removeVerifierPopup.setRemoveVerifySubmitAction(() => {
        api.removeCard(cardId)
        .then(() => card.removeCard());
      });/*** */
    },
    handleAddCardLike: (cardId) => {
      api.addCardLike(cardId)
      .then((updatedCardData) => {
        card.activateLikeButton(updatedCardData);
        card.likes = updatedCardData.likes;
      });
    },
    handleRemoveCardLike: (cardId) => {
      api.removeCardLike(cardId)
      .then((updatedCardData) => {
        card.deactivateLikeButton(updatedCardData);
        card.likes = updatedCardData.likes;
      });
    }
  }, 
    templateSelector, userInfo
  );
  return card;//HandlediisplayRemoveButton()=>{}in or out of create card
}

export const renderUploading = (isUploading, element, defaultText, text) => {
  if (isUploading) {
    element.textContent = text;
  } else {
    element.textContent = defaultText;
  }
}//use at addnewcards , profilepictureupdate forms