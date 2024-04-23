import { DOMElements } from "./DOMElements.js"
import { courses } from "./coursesList.js"

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

export const buyCourse = async (target) => {

    /* capturando tabela de cursos já adquiridos pelos usuários
        id do usuário logado
        curso que será adquirido
    */
    const userCoursesList = JSON.parse(localStorage.getItem('userCourses')) || []
    const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'))
    const courseTitle = target.parentElement.querySelector('.course-title').textContent
    const courseToBuy = courses.find(course => course.name == courseTitle)
    const newCourse = {
        userId: loggedUser.id,
        name: courseToBuy.name,
        totalLessons: courseToBuy.totalLessons,
        value: courseToBuy.value,
        promotionValue: courseToBuy.promotionValue,
        aquired: true
    }
    console.log(courseToBuy);

    await callDialogLoader('efetuando compra...')

    if (courseToBuy.promotionValue && loggedUser.cash > courseToBuy.promotionValue) {
        userCoursesList.push(newCourse)
        localStorage.setItem('userCourses', JSON.stringify(userCoursesList))
    } else if (!courseToBuy.promotionValue && loggedUser.cash > courseToBuy.value) {
        userCoursesList.push(newCourse)
        localStorage.setItem('userCourses', JSON.stringify(userCoursesList))
    } else {
        callAlert('erro', 'saldo insuficiente para completar a compra')
    }

}