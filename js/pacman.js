'use strict'
var isSuper = false
const PACMAN = `<img src="img/p-o.png" />`
var gPacman

var imgsUp = ['pacman-halfopen-u2.png', 'pacman-open-u2.png']
var imgsDown = ['pacman-halfopen-d2.png', 'pacman-open-d2.png']
var imgsRight = ['pacman-halfopen-r2.png', 'pacman-open-r2.png']
var imgsLeft = ['pacman-halfopen-l2.png', 'pacman-open-l2.png']
var currPacImg

function createPacman(board) {
    // initialize gPacman...
    gPacman = {
        location: {
            i: 8,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    // use getNextLocation(), nextCell
    const nextLocation = getNextLocation(ev)
    // console.log('nextLocation', nextLocation)
    if (!nextLocation) return

    const nextCellContent = board[nextLocation.i][nextLocation.j]
    // console.log('nextCellContent', nextCellContent)
    // return if cannot move
    if (nextCellContent === WALL) return
    // hitting a ghost? call gameOver
    if (nextCellContent === GHOST) {
        if (!isSuper) {
            gameOver(false)
            return
        }
        eatGhost(nextLocation)
    }
    if (nextCellContent === CHERRY) updateScore(10)
    if (nextCellContent === FOOD) {
        updateScore(1)
        gFoodCounter--

    } else if (nextCellContent === SUPERFOOD) {
        if (isSuper) return
        isSuper = true
        const waka = new Audio('sounds/waka.mp3');
        waka.play();
        setTimeout(function () {
            isSuper = false
            console.log(gEatenGhosts);
            gGhosts = gGhosts.concat(gEatenGhosts)
            gEatenGhosts=[]

        }, 5000)
        // superMode()
    }


    // moving from current location:
    // update the model
    board[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)
    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    board[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    changePacDirImg()

    if (gFoodCounter === 0) gameOver(true)

}

function getNextLocation(eventKeyboard) {
    // console.log('eventKeyboard.code', eventKeyboard.code)
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // figure out nextLocation
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            currPacImg = imgsUp
            break
        case 'ArrowDown':
            nextLocation.i++
            currPacImg = imgsDown
            break
        case 'ArrowRight':
            nextLocation.j++
            currPacImg = imgsRight
            break
        case 'ArrowLeft':
            nextLocation.j--
            currPacImg = imgsLeft
            break
        default:
            return null
    }

    return nextLocation
}

function changePacDirImg() {
    var img = `<img src="img/${currPacImg[1]}" />`
    renderCell(gPacman.location, img)
    setTimeout(function () {
        img = `<img src="img/${currPacImg[0]}" />`
        renderCell(gPacman.location, img)
    }, 100)
    setTimeout(function () {
        img = `<img src="img/p-c.png" />`
        renderCell(gPacman.location, img)
    }, 200)
    setTimeout(function () {
        img = `<img src="img/${currPacImg[0]}" />`
        renderCell(gPacman.location, img)
    }, 300)
}