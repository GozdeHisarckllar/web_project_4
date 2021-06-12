import Card from "../components/Card.js";

const createCard = (itemInfo, popupClass, templateSelector) => {
  const card = new Card({
    data: itemInfo, 
    handleCardClick: (item) => {
      popupClass.open(item);
    }}, 
    templateSelector
  );
  return card;
}

export default createCard;