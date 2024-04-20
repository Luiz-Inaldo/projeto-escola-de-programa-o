/* 
    OBS: Todos os elementos do DOM capturados
    estão presentes nesse script 
 */

export const DOMElements = {
    /* login/register elements */
    loginSwitcher: document.getElementById('login'),
    registerSwitcher: document.getElementById('register'),
    loginUsernameInput: document.getElementById('username'),
    loginPasswordInput: document.getElementById('password'),
    loginForm: document.querySelector('#login-form'),
    loginButton: document.querySelector('#login-form button'),
    registerForm: document.querySelector('#register-form'),
    registerUsernameInput: document.querySelector('#registerUsername'),
    registerEmailInput: document.querySelector('#registerEmail'),
    registerPasswordInput: document.querySelector('#registerPassword'),
    registerConfirmPasswordInput: document.querySelector('#confirmPassword'),
    registerAnchor: document.querySelector('#login-form p span'),
    generatePasswordAnchor: document.querySelector('#register-form p span'),
    /* general */
    loggedUsernameElement: document.querySelector('.menu-title'),
    loggedMailElement: document.querySelector('.user-mail'),
    logoutButton: document.getElementById('logout'),
    dialogContainer: document.querySelector('.dialog-container'),
    dialogElement: document.querySelector('.dialog'),
    alertElement: document.querySelector('.alert'),
}