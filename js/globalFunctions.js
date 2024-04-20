import { DOMElements } from "./DOMElements.js"

/* 
    OBS: Todas as funções usadas comumente
    estão presentes nesse script 
 */

export const sleep = async (miliseconds) => {

    return new Promise(res => setTimeout(res, miliseconds))

}

export const callDialogLoader = async (message) => {

    DOMElements.dialogContainer.classList.remove('hidden')
    DOMElements.dialogElement.querySelector('p').textContent = `${message}`
    await sleep(2000)
    DOMElements.dialogContainer.classList.add('hidden')

}

export const callAlert = async (type, message) => {

    const alertText = DOMElements.alertElement.querySelector('p')
    DOMElements.alertElement.classList.add('show-alert')
    alertText.textContent = `${message}`

    switch (type) {
        case "erro":
            alertText.style.color = "#fc3333"
            await sleep(1500)
            break;
        case "sucesso":
            alertText.style.color = "#09aa09"
            await sleep(1500)
            break;
        case "senha":
            alertText.style.fontWeight = "bold"
            alertText.style.color = "#0e4166"
            await sleep(5000)
        default:
            break;
    }
    
    DOMElements.alertElement.classList.remove('show-alert')

}