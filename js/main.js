import { DOMElements } from "./DOMElements.js"
import { initialize, buyCourse, logout, displayMenuUserInfo, displayFeaturesCourses } from "./globalFunctions.js"

// verifica se há uma sessão aberta
if (!sessionStorage.getItem('loggedUser')) {
    window.location.href = '/'
}

// eventos comuns
DOMElements.logoutButton.addEventListener('click', () => {
    logout()
})

if (window.location.pathname == '/pages/home.html') {

    // eventos do pathname
    DOMElements.featuredCoursesList.addEventListener('click', async (e) => {
        if (e.target.classList.contains('aquire')) {
            await buyCourse(e.target)
            displayFeaturesCourses()
        }
    })

    // funções do pathname
    initialize(displayFeaturesCourses(), displayMenuUserInfo())
}

if (window.location.pathname == '/pages/about.html') {
    
    
    //funções do pathname
    initialize(displayMenuUserInfo())
}