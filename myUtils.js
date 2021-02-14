function RandomItemFromArray(myArray) {
    return myArray[Math.floor(Math.random() * myArray.length)]
}

module.exports.RandomItemFromArray = RandomItemFromArray