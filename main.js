const express = require("express")
const path = require("path")
const fs = require("fs")
const { getValidFiles } = require("./getValidFiles")
const exphbs = require("express-handlebars")
const { utimes } = require("utimes")
const { RandomItemFromArray } = require("./myUtils")
const e = require("express")

const app = express()

app.use(express.json())

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const port = 5000
const pathToiCloud = '/Users/jonathan/Library/Mobile Documents/iCloud~is~workflow~my~workflows/Documents/'

app.use(express.static(path.join(__dirname, "content")))

let prevFlashCard = ''
let newFlashCard = ''

app.get("/flashcards/:folder", async (req, res) => {
    let folder = req.params.folder
    let num = parseInt(req.params.num)
    let pathToFolder = `${pathToiCloud}${folder}`
    numberChanger = {
        "zero": 0,
        "one": 1,
        "three": 3,
        "seven": 7,
        "seventeen": 17,
        "testing": 0,
    }
    let intNum = numberChanger[folder.toLowerCase()]
    let allValidFiles = await getValidFiles(pathToFolder, intNum)

    if (allValidFiles.length > 0) {
        if (allValidFiles.length >= 2) {
            // prevent getting same flashcard twice when using keep
            do {
                newFlashCard = RandomItemFromArray(allValidFiles)
            } while (newFlashCard === prevFlashCard)
            prevFlashCard = newFlashCard

            let folderAndFileName = path.parse(`${folder}/${newFlashCard}`)
            res.render('home', { partialAudioPath: `${folder}/${folderAndFileName.name}` })
        }
    } else {
        res.render('noMoreCards')
    }
})

// send audio files that html requests
app.get("/res/:folder/:filename", async (req, res) => {
    let requestPath = `${pathToiCloud}${req.params.folder}/${req.params.filename}`
    // console.log(requestPath);
    res.sendFile(requestPath)

})

// move question and answer based on json request
app.post("/moveFlashcard", async (req, res) => {
    console.log("moveFlashcard");

    if (req.body.NewFolder === "Keep") {
        console.log("Flashcard Kept");
        res.status(200).send("Moved Files")
        return
    }

    let currentFilePathQuestion = `${pathToiCloud}${req.body.CurrentFolder}/${req.body.QuestionPartialPath}`
    let currentFilePathAnswer = `${pathToiCloud}${req.body.CurrentFolder}/${req.body.AnswerPartialPath}`

    let newFilePathQuestion = `${pathToiCloud}${req.body.NewFolder}/${req.body.QuestionPartialPath}`
    let newFilePathAnswer = `${pathToiCloud}${req.body.NewFolder}/${req.body.AnswerPartialPath}`

    // change date created to now. Copying file doesn't change date created and this is needed when filtering files
    await utimes(currentFilePathQuestion, { btime: Date.now() })
    await utimes(currentFilePathAnswer, { btime: Date.now() })

    // move file
    fs.renameSync(currentFilePathQuestion, newFilePathQuestion)
    fs.renameSync(currentFilePathAnswer, newFilePathAnswer)

    res.status(200).send("Moved Files")
})

app.listen(port, () => { console.log("Application started"); })











