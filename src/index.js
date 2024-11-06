import './index.css';
import {initialCards, createCard, deleteCard, like} from './components/cards';
import {openModal, closeModal} from './components/modal';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupCloseTypeEdit = popupTypeEdit.querySelector('.popup__close');
const popupForm = popupTypeEdit.querySelector('.popup__form');
const nameInput = popupForm.querySelector('.popup__input_type_name');
const descriptionInput = popupForm.querySelector('.popup__input_type_description'); 
const profileTitle = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description');      
const profileAddButton = document.querySelector('.profile__add-button'); 
const newCardPopup = document.querySelector('.popup_type_new-card'); 
const popupCloseNewCard = newCardPopup.querySelector('.popup__close'); 
const newCardForm = newCardPopup.querySelector('.popup__form'); 
const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name'); 
const placeLinkInput = newCardForm.querySelector('.popup__input_type_url'); 

initialCards.forEach((card) => {
    const cardElement = createCard(card, deleteCard, openImagePopup);
        placesList.append(cardElement);
});

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    openModal(popupTypeEdit);
});

popupCloseTypeEdit.addEventListener('click', () => closeModal(popupTypeEdit));
    
popupForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
    closeModal(popupTypeEdit);
});

profileAddButton.addEventListener('click', () => openModal(newCardPopup));

popupCloseNewCard.addEventListener('click', () => closeModal(newCardPopup));

newCardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardData = {
        name: placeNameInput.value,
        link: placeLinkInput.value
    };
    const cardElement = createCard(cardData, deleteCard, openImagePopup);
    placesList.prepend(cardElement);
    newCardForm.reset();
    closeModal(newCardPopup);
});

placesList.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__like-button')) {
        like(evt.target); 
    };
});

function openImagePopup(name, link) {
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    const imagePopupClose = imagePopup.querySelector('.popup__close');
    popupImage.src = link;
    popupImage.alt = name;
    popupCaption.textContent = name;
    openModal(imagePopup);
    imagePopupClose.addEventListener('click', () => closeModal(imagePopup));
};

