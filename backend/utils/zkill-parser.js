const zkillParser = (stuff) => {
    const zkillDataLength = Object.keys(stuff).length;
    const firstInList = Object.keys(stuff)[0] + ' ' + Object.values(stuff)[0]
    return zkillDataLength + ' ' + firstInList
}



module.exports = zkillParser;