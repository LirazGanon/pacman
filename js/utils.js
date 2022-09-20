'use strict'

function renderBoard(board, selector) {

    var strHTML = '<table border="0"><tbody>'
    for (var i = 0; i < board.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function countCellContect(board, contect) {
    var count = 0
    for (var i = 0; i < board.length; i++) {
        var cuurCol = board[i]
        for (var j = 0; j < cuurCol.length; j++) {
            if (cuurCol[j] === contect) {
                count++
            }
        }
    }
    return count
}

function findContectLocation(board, contect) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === contect) {
                emptyCells.push({ i: i, j: j })
            }
        }
    }
    return emptyCells
}
    function getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
