
let question = document.querySelector("#question")
let answer = document.querySelector("#answer")
let button = document.querySelector("button")
let body = document.querySelector("body")

question.currentTime = 25
question.playbackRate = 1.3
answer.playbackRate = 1.3

question.onended = function () {
    let next = document.createElement("h2")
    next.textContent = "Presss space for next"
    body.insertBefore(next, question)
}

window.addEventListener('keydown', (event) => {
    if (event.key === " ") {
        // Toastify({
        //     text: "Space pressed",
        //     duration: 3000,
        //     close: true,
        //     gravity: "bottom", // `top` or `bottom`
        //     position: "left", // `left`, `center` or `right`
        //     backgroundColor: "linear-gradient(to right, #1A73E8, #1A73E8)",
        //     stopOnFocus: true, // Prevents dismissing of toast on hover
        // }).showToast();
        question.pause()
        answer.play()

    }
})


