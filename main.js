
let question = document.querySelector("#question")
let answer = document.querySelector("#answer")
let button = document.querySelector("button")
let body = document.querySelector("body")

let numTimesSpacePressed = 0

function spacePressed() {
    if (numTimesSpacePressed === 0) {
        question.play()
        numTimesSpacePressed++
    } else if (numTimesSpacePressed === 1) {
        question.pause()
        answer.play()
        numTimesSpacePressed++
    } else {
        if (answer.paused)
            answer.play()
        else
            answer.pause()
    }
}

window.addEventListener('keydown', async (event) => {
    if (event.key === " ") {
        spacePressed()
    }
    if (event.key === "a") {
        await sendMovePostRequestToServer("Zero")
    }
    if (event.key === "s") {
        await sendMovePostRequestToServer("One")
    }
    if (event.key === "d") {
        await sendMovePostRequestToServer("Three")
    }
    if (event.key === "f") {
        await sendMovePostRequestToServer("Seven")
    }
    if (event.key === "f") {
        await sendMovePostRequestToServer("17")
    }
    if (event.key === "c") {
        await sendMovePostRequestToServer("Keep")
    }
    if (event.key === "t") {
        await sendMovePostRequestToServer("Trash")
    }
})

function getCurrentFolderFromPageURL() {
    let endBitOfURL = window.location.pathname // e.g. "/flashcards/Zero"
    let justFolder = endBitOfURL.split('/')[2]  // e.g. "Zero"
    return justFolder
};


async function sendMovePostRequestToServer(newFlashCardFolderLocation) {

    let pressedButton = document.querySelector(`#${newFlashCardFolderLocation.toLowerCase()}`)
    // change background color to light blue 
    pressedButton.style.background = "rgb(190, 204, 254)"
    setTimeout(() => {
        pressedButton.style.background = null
        window.location.reload();
    }, 200)

    let partialPathQuestion = document.querySelector("#question-source").src
    partialPathQuestion = decodeURIComponent(partialPathQuestion.split('/')[5]); // converts http://localhost:5000/res/Testing/[question2]%20[596]-Answer.m4a" into "[html] [465].m4a"

    let partialPathAnswer = document.querySelector("#answer-source").src
    partialPathAnswer = decodeURIComponent(partialPathAnswer.split('/')[5])

    let headerBody = JSON.stringify({ CurrentFolder: getCurrentFolderFromPageURL(), NewFolder: newFlashCardFolderLocation, QuestionPartialPath: partialPathQuestion, AnswerPartialPath: partialPathAnswer })
    let headerObjectThing = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: headerBody
    }
    const rawResponse = await fetch('http://localhost:5000/moveFlashcard', headerObjectThing);
    const content = await rawResponse.json();

    console.log(content);
}

let trash = document.querySelector("#trash")
trash.addEventListener('click', async () => {
    await sendMovePostRequestToServer("Trash")
})

let keep = document.querySelector("#keep")
keep.addEventListener('click', async () => {
    await sendMovePostRequestToServer("Keep")
})

let zero = document.querySelector("#zero")
zero.addEventListener('click', async () => {
    await sendMovePostRequestToServer("Zero")
})
let one = document.querySelector("#one")
one.addEventListener('click', async () => {
    await sendMovePostRequestToServer("One")
})

let three = document.querySelector("#three")
three.addEventListener('click', async () => {
    await sendMovePostRequestToServer("Three")
})
let seven = document.querySelector("#seven")
seven.addEventListener('click', async () => {
    await sendMovePostRequestToServer("Seven")
})
let seventeen = document.querySelector("#seventeen")
seventeen.addEventListener('click', async () => {
    await sendMovePostRequestToServer("17")
})
