import { DOMElements } from "./DOMElements.js"
import { callDialogLoader, callAlert } from "./globalFunctions.js"

//verificando se existe sessão aberta
if (sessionStorage.getItem('loggedUser')) window.location.href = "/templates/home.html"

//eventos
DOMElements.loginSwitcher.addEventListener('click', () => {
    activateCurrentState(DOMElements.loginSwitcher, DOMElements.registerSwitcher,
        DOMElements.loginForm, DOMElements.registerForm)

})

DOMElements.registerSwitcher.addEventListener('click', () => {
    activateCurrentState(DOMElements.registerSwitcher, DOMElements.loginSwitcher,
        DOMElements.registerForm, DOMElements.loginForm)

})

DOMElements.registerAnchor.addEventListener('click', () => {
    activateCurrentState(DOMElements.registerSwitcher, DOMElements.loginSwitcher,
        DOMElements.registerForm, DOMElements.loginForm)

})

DOMElements.generatePasswordAnchor.addEventListener('click', () => {
    const password = generatePassword()
    callAlert("senha", `Sua senha é: \n${password}`)
})

DOMElements.loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    login()
})

DOMElements.registerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    register()
})

DOMElements.registerUsernameInput.addEventListener('input', (e) => {

    const usernameValidation = validInputOnlyLettersAndNumbers(e.target.value)
    e.target.value = usernameValidation

})


//funções
function activateCurrentState(activeButton, disabledButton, showForm, hiddenForm) {

    activeButton.classList.add('active')
    disabledButton.classList.remove('active')
    hiddenForm.classList.add('hidden')
    showForm.classList.remove('hidden')

    activeButton.querySelector('.select-arrow').classList.add('active')
    disabledButton.querySelector('.select-arrow').classList.remove('active')

    clearValues()

}

const generatePassword = () => {

    let password = ""
    const vocabulary = "abcdefghijklmnopqrstuvxwyzABCDEFGHIJKLMNOPQRSTUVXWYZ0123456789"
    const length = 10

    for (let i = 0; i < length; i++) {

        password += vocabulary[Math.floor(Math.random() * vocabulary.length)]

    }

    return password

}

const login = async () => {

    const db = JSON.parse(localStorage.getItem('users')) || []
    const username = DOMElements.loginUsernameInput.value
    const password = DOMElements.loginPasswordInput.value

    if (!username || !password) {

        callAlert("erro", "Nome de usuário ou senha não podem estar vazios.")
        return

    }

    let successfullLogin = false;

    db.forEach(user => {

        if (user.username === username && user.password === password) {
            const loggedUser = db.find(user => user.username == username)
            delete loggedUser.password
            sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser))
            successfullLogin = true
            return
        }
    })

    if (!successfullLogin) { callAlert("erro", "Usuário ou senha incorretos!"); return }

    await callDialogLoader(`fazendo login...`)

    window.location.href = '/templates/home.html'

}

const register = async () => {

    const username = DOMElements.registerUsernameInput.value
    const email = DOMElements.registerEmailInput.value
    const password = DOMElements.registerPasswordInput.value
    const confirmPassword = DOMElements.registerConfirmPasswordInput.value

    const newUser = {
        id: 1,
        username: username,
        email: email,
        password: password
    }

    if (username.length < 5 || username.length > 30) {
        return callAlert("erro", "O campo nome de usuário deve conter no mínimo 5 caracteres.")
    }

    const db = JSON.parse(localStorage.getItem('users')) || []
    let checkExistentUser = false;

    db.forEach(user => {

        if (user.id == newUser.id) newUser.id++;

        if (user.username == newUser.username) checkExistentUser = true;

    })

    if (checkExistentUser) {
        callAlert("erro", "Usuário já existente")
        return
    } else if (password == confirmPassword) {
        await callDialogLoader(`Cadastrando usuário...`)
        callAlert("sucesso", "Usuário cadastrado com sucesso!")
        clearValues()
        db.push(newUser)
        localStorage.setItem('users', JSON.stringify(db))
    } else {
        callAlert("erro", "Os campos de senha devem coincidir.")
    }

}

const clearValues = () => {

    DOMElements.loginUsernameInput.value = ""
    DOMElements.loginPasswordInput.value = ""
    DOMElements.registerUsernameInput.value = ""
    DOMElements.registerPasswordInput.value = ""
    DOMElements.registerConfirmPasswordInput.value = ""
    DOMElements.registerEmailInput.value = ""

}

const validInputOnlyLettersAndNumbers = (text) => {

    return text.replace(/[^a-zA-Z0-9 ]/g, "")

}