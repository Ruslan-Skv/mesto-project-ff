(()=>{"use strict";function e(e,t,r,n,o){var c=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),u=c.querySelector(".card__title"),i=c.querySelector(".card__delete-button"),l=c.querySelector(".card__like-button"),s=c.querySelector(".like");return a.src=e.link,a.alt=e.name,u.textContent=e.name,s.textContent=e.likes.length,e.owner._id!==t?i.remove():i.addEventListener("click",(function(){o(e._id,c)})),e.likes.some((function(e){return e._id===t}))&&l.classList.add("card__like-button_is-active"),l.addEventListener("click",(function(){return n(e._id,l,s)})),a.addEventListener("click",(function(){return r(e.name,e.link)})),c}function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n),e.addEventListener("click",o)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n),e.removeEventListener("click",o)}function n(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&r(t)}}function o(e){e.target.classList.contains("popup")&&r(e.target)}var c=function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r),o.classList.remove(n),o.textContent=""},a=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(r)):(t.disabled=!0,t.classList.add(r))},u=function(e,t){var r=t.inputSelector,n=t.submitButtonSelector,o=t.inactiveButtonClass,u=t.inputErrorClass,i=t.errorClass,l=Array.from(e.querySelectorAll(r)),s=e.querySelector(n);l.forEach((function(t){c(e,t,u,i)})),a(l,s,o)},i={baseUrl:"https://nomoreparties.co/v1/wff-cohort-27",headers:{authorization:"73767913-2b09-4fbc-ab99-3fe4adc7aba2","Content-Type":"application/json"}};function l(e,t){return fetch(e,t).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var d,p,f,_,y,v,m,S,h=document.querySelector(".places__list"),b=document.querySelector(".profile__edit-button"),q=document.querySelector(".popup_type_edit"),E=q.querySelector(".popup__close"),L=q.querySelector(".popup__form"),k=L.querySelector(".popup__button"),g=L.querySelector(".popup__input_type_name"),C=L.querySelector(".popup__input_type_description"),x=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),U=document.querySelector(".profile__add-button"),T=document.querySelector(".popup_type_new-card"),w=T.querySelector(".popup__close"),j=T.querySelector(".popup__form"),O=j.querySelector(".popup__button"),B=j.querySelector(".popup__input_type_card-name"),D=j.querySelector(".popup__input_type_url"),P=document.querySelector(".popup_type_image"),I=P.querySelector(".popup__image"),M=P.querySelector(".popup__caption"),N=P.querySelector(".popup__close"),J=document.querySelector(".popup_type_delete"),G=J.querySelector(".popup__close"),H=J.querySelector(".popup__confirm-button"),V=document.querySelector(".popup_type_avatar"),z=V.querySelector(".popup__form"),R=z.querySelector(".popup__button"),$=z.querySelector(".popup__input_type_avatar-url"),F=V.querySelector(".popup__close"),K={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},Q=null,W=null,X=document.querySelector(".profile__image"),Y=document.createElement("div");function Z(e,r){I.src=r,I.alt=e,M.textContent=e,t(P)}function ee(e,t){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Сохранить";e?(t.textContent="Сохранение...",t.disabled=!0):(t.textContent=r,t.disabled=!1)}function te(e,t,r){var n=t.classList.contains("card__like-button_is-active")?function(e){return l("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:i.headers})}(e):function(e){return l("".concat(i.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:i.headers})}(e);n.then((function(e){t.classList.toggle("card__like-button_is-active"),r.textContent=e.likes.length})).catch((function(e){console.error(e)}))}function re(e,r){Q=e,W=r,t(J)}Y.classList.add("profile__image-edit-icon"),X.appendChild(Y),b.addEventListener("click",(function(){g.value=x.textContent,C.value=A.textContent,u(L,K),t(q)})),E.addEventListener("click",(function(){return r(q)})),L.addEventListener("submit",(function(e){var t;e.preventDefault(),ee(!0,k),(t={name:g.value,about:C.value},l("".concat(i.baseUrl,"/users/me"),{method:"PATCH",headers:i.headers,body:JSON.stringify(t)})).then((function(e){x.textContent=e.name,A.textContent=e.about,r(q)})).catch((function(e){console.log(e)})).finally((function(){ee(!1,k)}))})),U.addEventListener("click",(function(){u(j,K),t(T)})),w.addEventListener("click",(function(){return r(T)})),j.addEventListener("submit",(function(t){var n;t.preventDefault(),ee(!0,O),(n={name:B.value,link:D.value},l("".concat(i.baseUrl,"/cards"),{method:"POST",headers:i.headers,body:JSON.stringify(n)})).then((function(t){var n=e(t,d,Z,te,re);h.prepend(n),j.reset(),r(T)})).catch((function(e){console.log(e)})).finally((function(){ee(!1,O)}))})),N.addEventListener("click",(function(){return r(P)})),f=(p=K).formSelector,_=p.inputSelector,y=p.submitButtonSelector,v=p.inactiveButtonClass,m=p.inputErrorClass,S=p.errorClass,Array.from(document.querySelectorAll(f)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t,r,n,o,u){var i=Array.from(e.querySelectorAll(t)),l=e.querySelector(r);a(i,l,n),i.forEach((function(t){t.addEventListener("input",(function(){!function(e,t,r,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?c(e,t,r,n):function(e,t,r,n,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n),c.textContent=r,c.classList.add(o)}(e,t,t.validationMessage,r,n)}(e,t,o,u),a(i,l,n)}))}))}(e,_,y,v,m,S)})),Promise.all([l("".concat(i.baseUrl,"/users/me"),{method:"GET",headers:i.headers}),l("".concat(i.baseUrl,"/cards"),{method:"GET",headers:i.headers})]).then((function(t){var r,n,o=(n=2,function(e){if(Array.isArray(e))return e}(r=t)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,a,u=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(u.push(n.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(a=r.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(r,n)||function(e,t){if(e){if("string"==typeof e)return s(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?s(e,t):void 0}}(r,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];d=c._id,x.textContent=c.name,A.textContent=c.about,X.style.backgroundImage="url(".concat(c.avatar,")"),a.forEach((function(t){var r=e(t,d,Z,te,re);h.append(r)}))})).catch((function(e){console.error(e)})),X.addEventListener("click",(function(){u(z,K),t(V)})),F.addEventListener("click",(function(){return r(V)})),z.addEventListener("submit",(function(e){var t;e.preventDefault(),ee(!0,R),(t=$.value,l("".concat(i.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:i.headers,body:JSON.stringify({avatar:t})})).then((function(e){e.avatar?(X.style.backgroundImage="url(".concat(e.avatar,")"),r(V),z.reset()):console.error("Avatar URL not returned from server")})).catch((function(e){console.error("Error updating avatar:",e)})).finally((function(){ee(!1,R)}))})),H.addEventListener("click",(function(){var e;Q&&W&&(e=Q,l("".concat(i.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:i.headers})).then((function(){W.remove(),r(J),Q=null,W=null})).catch((function(e){console.log("Ошибка: ".concat(e))}))})),G.addEventListener("click",(function(){return r(J)}))})();