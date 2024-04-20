import { DOMElements } from "./DOMElements.js"
import { callDialogLoader, callAlert } from "./globalFunctions.js"

// verifica se há uma sessão aberta
if (!sessionStorage.getItem('loggedUser')) {
    window.location.href = '/'
}

// eventos
DOMElements.logoutButton.addEventListener('click', () => {
    logout()
})

//funções
const initialize = () => {

    const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'))
    DOMElements.loggedUsernameElement.textContent = `Olá, ${loggedUser.username}`
    DOMElements.loggedMailElement.textContent = `${loggedUser.email}`

}

const logout = async () => {
    await callDialogLoader(`Saindo...`)
    sessionStorage.clear()
    window.location.href = "/"

}

// initialize
initialize()