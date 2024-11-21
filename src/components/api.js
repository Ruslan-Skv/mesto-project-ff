const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-27",
  headers: {
    authorization: "73767913-2b09-4fbc-ab99-3fe4adc7aba2",
    "Content-Type": "application/json",
  },
};

function fetchData(url, options) {
  return fetch(url, options).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  });
}

export function getUserData() {
  return fetchData(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  });
}

export function getCards() {
  return fetchData(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  });
}

export function updateUserData(data) {
  return fetchData(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(data),
  });
}

export function addCard(data) {
  return fetchData(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(data),
  });
}

export function removeCard(cardId) {
  return fetchData(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

export function likeCard(cardId) {
  return fetchData(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
}

export function unlikeCard(cardId) {
  return fetchData(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

export function updateAvatar(avatarUrl) {
  return fetchData(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  });
}
