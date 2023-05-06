'use strict';

const $ = (selector) => document.querySelector(selector);

const $inputEmail = $('#email');
const $form = $('.form');
const $modal = $('.modal');
const $btnCloseModal = $('.btn-close');

const isValidEmail = (email) => {
  const regex = /^[\w.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const displayError = (element, msg) => {
  const formControl = element.parentElement;
  element.classList.add('form__control-error');
  formControl.querySelector('.form__control-error-msg').textContent = msg;
};

const removeError = (element) => {
  const formControl = element.parentElement;
  element.classList.remove('form__control-error');
  formControl.querySelector('.form__control-error-msg').textContent = '';
};

const generateSubscribeModal = (modal) => {
  const markup = `
    <div class="modal-content">
      <img
        class="modal__success-icon"
        src="./images/icon-success.svg"
        alt=""
        aria-hidden="true"
        height="100"
        width="100"
      />
      <h2 class="modal__heading">Congratulations!</h2>
      <p class="modal__text">
        You have successfully subscribed to receive notifications about
        <span class="modal__highlight">PING</span>
        launch. We will keep you informed with the latest news, announcements,
        and release dates.
      </p>
      <p class="modal__text">
        Thank you for your interest and support. We can't wait to share our
        exciting new website with you!
      </p>
      <button class="btn-close">Close</button>
    </div>
  `;
  modal.insertAdjacentHTML('afterbegin', markup);
};

const cleanModal = (modal) => {
  modal.innerHTML = '';
};

const closeModal = (modal) => {
  modal.setAttribute('closing', '');
  modal.addEventListener(
    'animationend',
    () => {
      modal.removeAttribute('closing');
      cleanModal(modal);
      modal.close();
    },
    { once: true }
  );
};

$form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = $inputEmail.value.trim().toLowerCase();
  if (!isValidEmail(email)) {
    return displayError($inputEmail, 'Please provide a valid email address');
  }
  removeError($inputEmail);
  generateSubscribeModal($modal);
  $inputEmail.value = '';
  $modal.showModal();
});

$modal.addEventListener('click', (e) => {
  if (e.target.nodeName != 'DIALOG') return;
  closeModal($modal);
});

$modal.addEventListener('click', (e) => {
  const modal = e.target.closest('.btn-close');
  if (!modal) return;
  closeModal($modal);
});
