import { openModal, closeModal } from "./modal";
import { likeCard, unlikeCard, removeCard } from "./api";

export function createCard(
  cardData,
  userId,
  deleteCardCallback,
  openImagePopupCallback
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
    toggleLike(cardData._id, likeButton, cardLikeCount)
  );

  cardImage.addEventListener("click", () =>
    openImagePopupCallback(cardData.name, cardData.link)
  );

  return cardElement;
}

function toggleLike(cardId, likeButton, cardLikeCount) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  const toggleLikeRequest = isLiked ? unlikeCard(cardId) : likeCard(cardId);

  toggleLikeRequest
    .then((updatedCard) => {
      likeButton.classList.toggle("card__like-button_is-active");
      cardLikeCount.textContent = updatedCard.likes.length;
    })
    .catch((error) => {
      console.error(error);
    });
}

function openDeleteConfirmationPopup(cardId, cardElement) {
  const deletePopup = document.querySelector(".popup_type_delete");
  const deleteConfirmButton = deletePopup.querySelector(
    ".popup__confirm-button"
  );

  openModal(deletePopup);

  deleteConfirmButton.addEventListener(
    "click",
    () => {
      deleteCard(cardId, cardElement);
      closeModal(deletePopup);
    },
    { once: true }
  );
}

export function deleteCard(cardId, cardElement) {
  removeCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
}
