import Card from "../components/Card.js";
import { api, removeVerifierPopup } from "../pages/index.js";


export const createCard = (itemInfo, popupClass, templateSelector, userInfo) => {
  const card = new Card({
    data: itemInfo, 
    handleCardClick: (item) => {
      popupClass.open(item);
    },
    handleRemoveVerify: (cardId) => {
      removeVerifierPopup.open();
      removeVerifierPopup.setRemoveVerifySubmitAction(() => {
        api.removeCard(cardId)
          .then(() => card.removeCard())
          .catch((err) => { console.log(err); });
      });
    },
    handleAddCardLike: (cardId) => {
      api.addCardLike(cardId)
        .then((updatedCardData) => {
          card.activateLikeButton(updatedCardData);
          card.likes = updatedCardData.likes;
        })
        .catch((err) => { console.log(err); });
    },
    handleRemoveCardLike: (cardId) => {
      api.removeCardLike(cardId)
        .then((updatedCardData) => {
          card.deactivateLikeButton(updatedCardData);
          card.likes = updatedCardData.likes;
        })
        .catch((err) => { console.log(err); });
    }
  }, 
    templateSelector, 
    userInfo
  );

  return card;
}