export function createCard(
  cardData,
  userId,
  openImagePopupCallback,
  toggleLikeCallback,
  openDeleteConfirmationPopup
) {
  const template = document.querySelector("#card-template").content;
  const cardElement = template.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".like");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;

  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener("click", () => {
      openDeleteConfirmationPopup(cardData._id, cardElement);
    });
  }

  if (cardData.likes.some((like) => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  likeButton.addEventListener("click", () =>
    toggleLikeCallback(cardData._id, likeButton, cardLikeCount)
  );

  cardImage.addEventListener("click", () =>
    openImagePopupCallback(cardData.name, cardData.link)
  );

  return cardElement;
}
