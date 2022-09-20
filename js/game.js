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
var board
var cherryInterval


function onOpenMsg() {
    document.querySelector('.open-msg').classList.remove('hide')
    document.body.addEventListener('keypress', onInit, { once: true });
    board = buildBoard()
    createPacman(board)
    createGhosts(board)
    // Dom
    renderBoard(board, '.board-container')
}

function onInit() {
    const intro = new Audio('sounds/intro.mp3');
    intro.play();
    document.querySelector('.open-msg').classList.add('hide')
    gGame.isOn = true
    gFoodCounter = countCellContect(board, FOOD)
    console.log(gFoodCounter);
    // debugger
    cherryInterval = setInterval(placeCherry, 10000)
    gIntervalGhosts = setInterval(moveGhosts, 800)
    setTimeout(() => {
        gGhostImageSwitch = setInterval(renderGhostImg, 300)
    }, 800);


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
                (j === 10 && i > 7 && i < size - 2) ||
                (i === 3 && j > 4 && j < size - 5)) {
                board[i][j] = WALL
            }
        }

    }
    board[5][5] = board[6][5] = board[6][6] = board[6][7] = WALL
    board[4][10] = board[6][7] = board[6][9] = board[6][10] = WALL
    board[4][12] = board[5][12] = board[6][12] = board[7][12] = WALL
    board[9][12] = board[9][13] = board[3][2] = board[2][2] = WALL
    board[2][3] = board[2][12] = board[2][13] = board[3][13] = WALL
    board[12][5] = board[11][5] = board[10][5]=board[9][5] = WALL
    board[9][8] = board[9][7]=board[9][6] = WALL
    board[10][8] = board[11][8] = board[12][8] = WALL

    board[4][6] = board[4][7] = board[4][8] = board[5][8] = board[4][9] = EMPTY
    board[5][7] = board[5][8] = board[6][8] = board[4][5] = EMPTY
    board[5][6] = board[5][9] = board[5][10] = EMPTY
   

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
    const emptyLocations = findContectLocation(board, EMPTY)
    if (!emptyLocations) return
    const randIdx = getRandomIntInclusive(0, emptyLocations.length - 1)
    const cherryLocation = emptyLocations[randIdx]
    board[cherryLocation.i][cherryLocation.j] = CHERRY
    renderCell(cherryLocation, CHERRY)
    setTimeout(() => {
        if (board[cherryLocation.i][cherryLocation.j] = CHERRY)
            board[cherryLocation.i][cherryLocation.j] = EMPTY
        renderCell(cherryLocation, EMPTY)
    }, 5000)

}

function gameOver(isWin) {
    console.log('Game Over')
    const pacmandying = new Audio('sounds/pacmandying.mp3');
    pacmandying.play();
    if (!isWin) gGame.isOn = false
    const msg = isWin ? 'Yeaaaa You did it!' : 'You lose try again!'
    document.querySelector('h4').innerText = msg
    document.querySelector('.modal').classList.remove('hide')
    renderCell(gPacman.location, EMPTY)
    clearInterval(gIntervalGhosts)
}

function restart() {
    console.log('im running');
    document.querySelector('.modal').classList.add('hide')
    gGame.score = 0
    gFoodCounter = 0
    gId = 0
    gEatenGhosts = []
    gIsFisrtImg = true
    gCurrGhostImgs = ghostImgs1
    updateScore(0)
    clearInterval(cherryInterval)
    clearInterval(gGhostImageSwitch)
    onOpenMsg()
}

