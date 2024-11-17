import "./index.css";
import { initialCards } from "./components/cards";
import { createCard, deleteCard } from "./components/card";
import { openModal, closeModal } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";

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

initialCards.forEach((card) => {
  const cardElement = createCard(card, deleteCard, openImagePopup);
  cardsContainer.append(cardElement);
});

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
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(popupTypeEdit);
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
  const cardData = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };
  const cardElement = createCard(cardData, deleteCard, openImagePopup);
  cardsContainer.prepend(cardElement);
  newCardForm.reset();
  closeModal(newCardPopup);
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
