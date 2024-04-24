import { DOMElements } from "./DOMElements.js"
import { courses } from "./coursesList.js"

/* 
    OBS: Todas as funções usadas comumente
    estão presentes nesse script 
 */

export const sleep = async (miliseconds) => {

    return new Promise(res => setTimeout(res, miliseconds))

}

export const initialize = (...functions) => {
    functions
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

export const displayFeaturesCourses = () => {

    DOMElements.featuredCoursesList.innerHTML = ""

    const featuredCourses = courses.filter(course => course.promotionValue)
    const userID = JSON.parse(sessionStorage.getItem('loggedUser')).id
    const userCoursesTable = JSON.parse(localStorage.getItem('userCourses')) || []
    const userCourses = userCoursesTable.filter(course => course.userId == userID)

    featuredCourses.forEach(course => {

        let alreadyBought = false

        userCourses.forEach(userCourse => {
            if (course.name == userCourse.name) {
                alreadyBought = true
            }
        })

        DOMElements.featuredCoursesList.innerHTML += `
        
                <div class="course">
                    <div class="course-img">
                        <img src="${course.img}" alt="course-img">
                    </div>

                    <div class="course-corpse">
                        <h3 class="course-title">${course.name}</h3>
                        <p class="course-description">
                            ${course.description}
                        </p>
                        <div class="course-price">
                            <span class="price ${course.promotionValue ? "lined" : ""}">R$: ${course.value.toString().replace('.', ',')}</span>
                            <span class="promoted-price ${course.promotionValue ? "" : "hidden"}">R$: ${course.promotionValue.toString().replace('.', ',')}</span>
                        </div>
                        <button class="aquire ${alreadyBought == true ? "disabled" : ""}">
                            ${alreadyBought ? "já possui" : "adicionar a sua grade"}
                            <svg ${alreadyBought ? "class='hidden'" : ""} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                    fill="#ffffff">
                                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <title></title>
                                        <g id="Complete">
                                            <g id="arrow-right">
                                                <g>
                                                    <polyline data-name="Right" fill="none" id="Right-2"
                                                        points="16.4 7 21.5 12 16.4 17" stroke="#fafafa"
                                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                                                    </polyline>
                                                    <line fill="none" stroke="#fafafa" stroke-linecap="round"
                                                        stroke-linejoin="round" stroke-width="2" x1="2.5" x2="19.2" y1="12"
                                                        y2="12"></line>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                            </svg>
                        </button>
                    </div>
                </div>
        
        `

    })

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
        done: 0,
        totalLessons: courseToBuy.totalLessons,
        value: courseToBuy.value,
        promotionValue: courseToBuy.promotionValue,
        aquired: true
    }

    await callDialogLoader('efetuando compra...');

    if (courseToBuy.promotionValue && loggedUser.cash > courseToBuy.promotionValue) {
        loggedUser.cash -= courseToBuy.promotionValue;
        loggedUser.cash = loggedUser.cash.toFixed(2)
        userCoursesList.push(newCourse)
        sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser))
        localStorage.setItem('userCourses', JSON.stringify(userCoursesList))
    } else if (!courseToBuy.promotionValue && loggedUser.cash > courseToBuy.value) {
        loggedUser.cash -= courseToBuy.value;
        loggedUser.cash = loggedUser.cash.toFixed(2)
        userCoursesList.push(newCourse)
        sessionStorage.setItem('loggedUser', JSON.stringify(loggedUser))
        localStorage.setItem('userCourses', JSON.stringify(userCoursesList))
    } else {
        callAlert('erro', 'saldo insuficiente para completar a compra')
    }

}

export const logout = async () => {
    await callDialogLoader(`Saindo...`)
    sessionStorage.clear()
    window.location.href = "/"

}

export const displayMenuUserInfo = () => {

    const loggedUser = JSON.parse(sessionStorage.getItem('loggedUser'))
    DOMElements.loggedUsernameElement.textContent = `Olá, ${loggedUser.username}`
    DOMElements.loggedMailElement.textContent = `${loggedUser.email}`

}