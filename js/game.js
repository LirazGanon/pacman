'use strict'

const WALL = '🔳'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🧆'
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false
}
var gFoodCounter
var gBoard
var cherryInterval 

function onOpenMsg() {
    document.querySelector('.open-msg').classList.remove('hide')
    document.body.addEventListener('keypress', onInit,{once : true});
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    // Dom
    renderBoard(gBoard, '.board-container')
}

function onInit() {
    const intro = new Audio('sounds/intro.mp3');
    intro.play();
    // Model:
    // gBoard = buildBoard()
    // createPacman(gBoard)
    // createGhosts(gBoard)

    // Dom
    // renderBoard(gBoard, '.board-container')
    document.querySelector('.open-msg').classList.add('hide')
    gFoodCounter = countCellContect(gBoard, FOOD)
    cherryInterval = setInterval(placeCherry,15000)
    gGame.isOn = true
    gIntervalGhosts = setInterval(moveGhosts, 800)
    gGhostImageSwitch = setInterval(renderGhostImg, 300)
}

function buildBoard() {
    const size = 16
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])
        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2) ||
                (j === 10 && i > 7 && i < size - 2)||
                (i === 3 && j > 4 && j < size - 2)) {
                board[i][j] = WALL
            }
        }

    }
    board[1][1] = board[1][board.length - 2] = SUPERFOOD
    board[board.length - 2][1] = board[board.length - 2][board.length - 2] = SUPERFOOD
    return board
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score

}

function placeCherry() {
    const emptyLocations = findContectLocation(gBoard, EMPTY)
    if(!emptyLocations) return
    const randIdx = getRandomIntInclusive(0, emptyLocations.length - 1)
    const cherryLocation = emptyLocations[randIdx]
    gBoard[cherryLocation.i][cherryLocation.j] = CHERRY
    renderCell(cherryLocation, CHERRY)

}

function gameOver(isWin) {
    console.log('Game Over')
    const pacmandying = new Audio('sounds/pacmandying.mp3');
    pacmandying.play();
    if(!isWin) gGame.isOn = false
    const msg = isWin ? 'Yeaaaa You did it!' : 'You lose try again!'
    document.querySelector('h4').innerText = msg
    document.querySelector('.modal').classList.remove('hide')
    renderCell(gPacman.location, EMPTY)
    clearInterval(gIntervalGhosts)
}

function restart() {
    document.querySelector('.modal').classList.add('hide')
    gGame.score = 0
    gFoodCounter = 0
    gId = 0
    gEatenGhosts = []
    updateScore(0)
    clearInterval(cherryInterval)
    clearInterval(gGhostImageSwitch)
    onOpenMsg()
}

