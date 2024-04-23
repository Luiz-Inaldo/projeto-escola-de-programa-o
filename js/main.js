import { DOMElements } from "./DOMElements.js"
import { courses } from "./coursesList.js"
import { callDialogLoader, callAlert, buyCourse } from "./globalFunctions.js"

// verifica se há uma sessão aberta
if (!sessionStorage.getItem('loggedUser')) {
    window.location.href = '/'
}

// eventos
DOMElements.logoutButton.addEventListener('click', () => {
    logout()
})

DOMElements.featuredCoursesList.addEventListener('click', async (e) => {
    if (e.target.classList.contains('aquire')) {
        await buyCourse(e.target)
        displayFeaturesCourses()
    }
})



//funções
const initialize = () => {

    displayMenuUserInfo()
    displayFeaturesCourses()

}

const displayFeaturesCourses = () => {

    DOMElements.featuredCoursesList.innerHTML = ""

    const userID = JSON.parse(sessionStorage.getItem('loggedUser')).id
    const userCoursesTable = JSON.parse(localStorage.getItem('userCourses')) || []
    const userCourses = userCoursesTable.filter(course => course.userId == userID)

    courses.forEach(course => {

        let alreadyBought = false

        userCourses.forEach(userCourse => {
            if (course.name == userCourse.name) {
                alreadyBought = true
            }
        })

        if (true/* course.promotionValue */) {
            
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
                            <span class="price lined">R$: ${course.value.toString().replace('.', ',')}</span>
                            <span class="promoted-price">R$: ${course.promotionValue.toString().replace('.', ',')}</span>
                        </div>
                        <button class="aquire ${alreadyBought == true ? "disabled" : ""}">
                            ${alreadyBought == true ? "já possui" : "adicionar a sua grade"}
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
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

        }

    })

}

const displayMenuUserInfo = () => {

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