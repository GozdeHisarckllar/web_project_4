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
        removeVerifierPopup.renderLoading(true, "Deleting...");
        api.removeCard(cardId)
          .then(() => card.removeCard())
          .then(() => removeVerifierPopup.close())
          .catch((err) => { console.log(err); })
          .finally(() => removeVerifierPopup.renderLoading(false));
      });
    },
    handleAddCardLike: (cardId) => {
      api.addCardLike(cardId)
        .then((updatedCardData) => {
          card.activateLikeButton(updatedCardData);
          card.updateCardLikes(updatedCardData);
        })
        .catch((err) => { console.log(err); });
    },
    handleRemoveCardLike: (cardId) => {
      api.removeCardLike(cardId)
        .then((updatedCardData) => {
          card.deactivateLikeButton(updatedCardData);
          card.updateCardLikes(updatedCardData);
        })
        .catch((err) => { console.log(err); });
    }
  }, 
    templateSelector, 
    userInfo
  );

  return card;
}