
let question = document.querySelector("#question")
let answer = document.querySelector("#answer")
let button = document.querySelector("button")
let body = document.querySelector("body")

// question.currentTime = 25
question.playbackRate = 1.3
answer.playbackRate = 1.3


window.addEventListener('keydown', (event) => {
    if (event.key === " ") {
        question.pause()
        answer.play()
    }
})


