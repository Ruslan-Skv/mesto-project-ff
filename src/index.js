import './index.css';
import {initialCards} from './scripts/cards';

    const placesList = document.querySelector('.places__list');

    function createCard(cardData, deleteCardCallback) {
        const template = document.querySelector('#card-template').content;
        const cardElement = template.querySelector('.card').cloneNode(true); 

        const cardImage = cardElement.querySelector('.card__image');
        cardImage.src = cardData.link;
        cardImage.alt = cardData.name;

        const cardTitle = cardElement.querySelector('.card__title');
        cardTitle.textContent = cardData.name;

        const deleteButton = cardElement.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', function() {
            deleteCardCallback(cardElement);
        });

        return cardElement;
    }

    function deleteCard(cardElement) {
        cardElement.remove();
    }

    initialCards.forEach((card) => {
        const cardElement = createCard(card, deleteCard);
        placesList.append(cardElement);
    });


    