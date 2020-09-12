const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName;

const login = event => {
    event.preventDefault();

    if (userNameInput.value.length <= 0) {
        alert('You must enter your name!');
    } else {
        userName = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
};

const sendMessage = event => {
    event.preventDefault();
    if (messageContentInput.value.length <= 0) {
        alert('You cant sent empty message!');
    } else {
        addMessage(userName, messageContentInput.value);
        messageContentInput.value = null;
    }
};

const addMessage = (name, text) => {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if (name === userName) message.classList.add('message--self');
    message.innerHTML = `
        <h3 class="message__author">${ userName === name ? 'You' : name }</h3>
        <div class="message__content">${ text }</div>
    `;
    messagesList.appendChild(message);
};

addMessageForm.addEventListener('submit', e => {
   sendMessage(e);
});

loginForm.addEventListener('submit', e => {
    login(e);
});