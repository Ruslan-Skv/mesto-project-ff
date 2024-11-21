import "./index.css";
import { createCard, deleteCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  getUserData,
  getCards,
  updateUserData,
  addCard,
  updateAvatar,
} from "./components/api";

const cardsContainer = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupCloseTypeEdit = popupTypeEdit.querySelector(".popup__close");
const typeEditForm = popupTypeEdit.querySelector(".popup__form");
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
const placeNameInput = newCardForm.querySelector(
  ".popup__input_type_card-name"
);
const placeLinkInput = newCardForm.querySelector(".popup__input_type_url");
const imagePopup = document.querySelector(".popup_type_image");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const imagePopupClose = imagePopup.querySelector(".popup__close");

function initialize() {
  Promise.all([getUserData(), getCards()])
    .then(([userData, cardsData]) => {
      const userId = userData._id;
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      avatar.src = userData.avatar;

      cardsData.forEach((card) => {
        const cardElement = createCard(
          card,
          userId,
          deleteCard,
          openImagePopup
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
  clearValidation(typeEditForm, {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
  openModal(popupTypeEdit);
});

popupCloseTypeEdit.addEventListener("click", () => closeModal(popupTypeEdit));

typeEditForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = typeEditForm.querySelector(".popup__button");
  renderLoading(true, submitButton);

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
      renderLoading(false, submitButton);
    });
});

profileAddButton.addEventListener("click", () => {
  clearValidation(newCardForm, {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
  openModal(newCardPopup);
});

popupCloseNewCard.addEventListener("click", () => closeModal(newCardPopup));

newCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = newCardForm.querySelector(".popup__button");
  renderLoading(true, submitButton);

  const cardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  addCard(cardData)
    .then((result) => {
      const cardElement = createCard(result, deleteCard, openImagePopup);
      cardsContainer.prepend(cardElement);
      newCardForm.reset();
      closeModal(newCardPopup);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(false, submitButton);
    });
});

function openImagePopup(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}

imagePopupClose.addEventListener("click", () => closeModal(imagePopup));

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

initialize();

const avatar = document.querySelector(".profile__image");
const avatarEditIcon = document.createElement("div");
avatarEditIcon.classList.add("profile__image-edit-icon");
avatar.appendChild(avatarEditIcon);

const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar-url");
const avatarPopupClose = avatarPopup.querySelector(".popup__close");

avatar.addEventListener("click", () => {
  clearValidation(avatarForm, {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
  });
  openModal(avatarPopup);
});

avatarPopupClose.addEventListener("click", () => closeModal(avatarPopup));

avatarForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const submitButton = avatarForm.querySelector(".popup__button");
  renderLoading(true, submitButton);

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
      renderLoading(false, submitButton);
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
