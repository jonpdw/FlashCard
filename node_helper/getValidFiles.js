const fs = require("fs")
const promisify = require("util").promisify


let fs_readdir_promisified = promisify(fs.readdir)

async function getAllFiles(pathToTesting) {
    let allFiles = await fs_readdir_promisified(pathToTesting)

    allFiles = allFiles.filter(file => file.includes(".m4a")) 
    allFiles = allFiles.filter(file => !file.includes("-Answer")) 
    return allFiles
}

async function getValidFiles(pathToTesting, minFileAge) {
    function getDifferenceInDays(date1, date2) {
        const diffInMs = Math.abs(date2 - date1);
        return diffInMs / (1000 * 60 * 60 * 24);
    }

    let allFiles = await fs_readdir_promisified(pathToTesting)

    allFiles = allFiles.filter(file => file.includes(".m4a")) 
    allFiles = allFiles.filter(file => !file.includes("-Answer")) 
    allFiles = allFiles.filter(file => {
        let stats = fs.statSync(`${pathToTesting}/${file}`) //?
        let daysSinceCreated = getDifferenceInDays(stats.birthtime, new Date()) //?
        return daysSinceCreated >= minFileAge
    })
    return allFiles
}

module.exports.getValidFiles = getValidFiles
module.exports.getAllFiles = getAllFiles
    

