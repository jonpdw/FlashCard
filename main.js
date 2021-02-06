import Toast from "/dependency/Toast-ES6.js"

let question = document.querySelector("#question")
let button = document.querySelector("button")
let answer = document.querySelector("#answer")
let body = document.querySelector("body")

question.currentTime = 25

question.onended = function() {
    // answer.play()
    let next = document.createElement("h2")
    next.textContent = "Presss space for next"
    body.insertBefore(next,question)
}

window.addEventListener('keydown', (event) => {
    if (event.key === " ") {
        alert
    }
})

button.addEventListener('click', () => {
    new Toast({message: 'Welcome to Toast.js!'});
})

