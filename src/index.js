import "./index.css";
import { createCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getUserData,
  getCards,
  updateUserData,
  addCard,
  updateAvatar,
  likeCard,
  unlikeCard,
  removeCard,
} from "./components/api";

const cardsContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupCloseTypeEdit = popupTypeEdit.querySelector(".popup__close");
const typeEditForm = popupTypeEdit.querySelector(".popup__form");
const typeEditFormPopupButton = typeEditForm.querySelector(".popup__button");
const nameInput = typeEditForm.querySelector(".popup__input_type_name");
const descriptionInput = typeEditForm.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAddButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const popupCloseNewCard = newCardPopup.querySelector(".popup__close");
const newCardForm = newCardPopup.querySelector(".popup__form");
const newCardFormPopupButton = newCardForm.querySelector(".popup__button");
const placeNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const placeLinkInput = newCardForm.querySelector(".popup__input_type_url");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupClose = imagePopup.querySelector(".popup__close");
const deletePopup = document.querySelector(".popup_type_delete");
const popupCloseDeletePopup = deletePopup.querySelector(".popup__close");
const deleteConfirmButton = deletePopup.querySelector(".popup__confirm-button");
const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarFormPopupButton = avatarForm.querySelector(".popup__button");
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar-url");
const avatarPopupClose = avatarPopup.querySelector(".popup__close");
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
let userId;
let cardIdToDelete = null;
let cardElementToDelete = null;
const avatar = document.querySelector(".profile__image");
const avatarEditIcon = document.createElement("div");
avatarEditIcon.classList.add("profile__image-edit-icon");
avatar.appendChild(avatarEditIcon);

function initialize() {
  Promise.all([getUserData(), getCards()])
    .then(([userData, cardsData]) => {
      userId = userData._id;
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      avatar.style.backgroundImage = `url(${userData.avatar})`;

      cardsData.forEach((card) => {
        const cardElement = createCard(
          card,
          userId,
          openImagePopup,
          toggleLike,
          openDeleteConfirmationPopup
        );
        cardsContainer.append(cardElement);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(typeEditForm, validationConfig);
  openModal(popupTypeEdit);
});

popupCloseTypeEdit.addEventListener("click", () => closeModal(popupTypeEdit));

typeEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, typeEditFormPopupButton);

  const updatedUserData = {
    name: nameInput.value,
    about: descriptionInput.value,
  };

  updateUserData(updatedUserData)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      closeModal(popupTypeEdit);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, typeEditFormPopupButton);
    });
});

profileAddButton.addEventListener("click", () => {
  clearValidation(newCardForm, validationConfig);
  openModal(newCardPopup);
});

popupCloseNewCard.addEventListener("click", () => closeModal(newCardPopup));

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, newCardFormPopupButton);

  const cardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  addCard(cardData)
    .then((result) => {
      const cardElement = createCard(
        result,
        userId,
        openImagePopup,
        toggleLike,
        openDeleteConfirmationPopup
      );
      cardsContainer.prepend(cardElement);
      newCardForm.reset();
      closeModal(newCardPopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, newCardFormPopupButton);
    });
});

function openImagePopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

imagePopupClose.addEventListener("click", () => closeModal(imagePopup));

enableValidation(validationConfig);

initialize();

avatar.addEventListener("click", () => {
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

avatarPopupClose.addEventListener("click", () => closeModal(avatarPopup));

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  renderLoading(true, avatarFormPopupButton);

  const avatarUrl = avatarInput.value;

  updateAvatar(avatarUrl)
    .then((userData) => {
      if (userData.avatar) {
        avatar.style.backgroundImage = `url(${userData.avatar})`;
        closeModal(avatarPopup);
        avatarForm.reset();
      } else {
        console.error("Avatar URL not returned from server");
      }
    })
    .catch((error) => {
      console.error("Error updating avatar:", error);
    })
    .finally(() => {
      renderLoading(false, avatarFormPopupButton);
    });
});

function renderLoading(isLoading, buttonElement, initialText = "Сохранить") {
  if (isLoading) {
    buttonElement.textContent = "Сохранение...";
    buttonElement.disabled = true;
  } else {
    buttonElement.textContent = initialText;
    buttonElement.disabled = false;
  }
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

deleteConfirmButton.addEventListener("click", () => {
  if (cardIdToDelete && cardElementToDelete) {
    removeCard(cardIdToDelete)
      .then(() => {
        cardElementToDelete.remove();
        closeModal(deletePopup);
        cardIdToDelete = null;
        cardElementToDelete = null;
      })
      .catch((error) => {
        console.log(`Ошибка: ${error}`);
      });
  }
});

popupCloseDeletePopup.addEventListener("click", () => closeModal(deletePopup));

function openDeleteConfirmationPopup(cardId, cardElement) {
  cardIdToDelete = cardId;
  cardElementToDelete = cardElement;
  openModal(deletePopup);
}
