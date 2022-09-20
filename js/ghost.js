'use strict'

var gId = 0
const GHOST = '&#9781'
var gGhosts
var gIntervalGhosts
var gGhostImageSwitch
var gIsFisrtImg = true
var gEatenGhosts = []

const ghostImgs1 = ['img/a-r-1.png', 'img/i-d-1.png', 'img/p-l-1.png']
const ghostImgs2 = ['img/a-r-2.png', 'img/i-d-2.png', 'img/p-l-2.png']
var gCurrGhostImgs = ghostImgs1


function createGhost(board) {
  var ghost = {
    id: gId++,
    location: {
      i: 3,
      j: 3,
    },
    currCellContent: FOOD,
  }
  gGhosts.push(ghost)
  gGhosts[gGhosts.length - 1].img = `<img id="#g${gGhosts.length - 1}" src="${ghostImgs1[gGhosts.length - 1]}"/>`
  board[ghost.location.i][ghost.location.j] = gGhosts[gGhosts.length - 1].img

}

function createGhosts(board) {
  // 3 ghosts and an interval
  gGhosts = []
  for (var i = 0; i < 3; i++) {
    createGhost(board)
  }
}

function moveGhosts() {
  // loop through ghosts
  for (var i = 0; i < gGhosts.length; i++) {
    const ghost = gGhosts[i]
    moveGhost(ghost)
  }
}

function moveGhost(ghost) {
  // console.log('move')
  // figure out moveDiff, nextLocation, nextCell
  const moveDiff = getMoveDiff()
  const nextLocation = {
    i: ghost.location.i + moveDiff.i,
    j: ghost.location.j + moveDiff.j,
  }
  // console.log('nextLocation', nextLocation)

  const nextCellContent = gBoard[nextLocation.i][nextLocation.j]
  // console.log('nextCellContent', nextCellContent)
  // console.log('nextCell', nextCell)
  // return if cannot move
  if (nextCellContent === WALL) {
    moveGhost(ghost)
    return
  }
  if (nextCellContent === GHOST) {
    moveGhost(ghost)
    return
  }

  // hitting a pacman? call gameOver
  if (nextCellContent === PACMAN) {
    if (isSuper) return
    gameOver(false)
    return
  }

  // moving from current location:
  // update the model (restore prev cell contents)
  gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
  // update the DOM
  renderCell(ghost.location, ghost.currCellContent)

  // Move the ghost to new location:
  // update the model (save cell contents so we can restore later)
  ghost.location = nextLocation
  ghost.currCellContent = nextCellContent
  gBoard[ghost.location.i][ghost.location.j] = GHOST
  // update the DOM
  renderCell(ghost.location, getGhostHTML(ghost.id))

}

function getMoveDiff() {
  const randNum = getRandomIntInclusive(1, 4)

  switch (randNum) {
    case 1:
      return { i: 0, j: 1 }
    case 2:
      return { i: 1, j: 0 }
    case 3:
      return { i: 0, j: -1 }
    case 4:
      return { i: -1, j: 0 }
  }
}

function getGhostHTML(idx) {
  if (isSuper) return `<img id="g${idx}" src="img/flash1.gif" />`
  return `<img id="g${idx}" src="${gCurrGhostImgs[idx]}" />`
}

function renderGhostImg() {
  if (isSuper) return

  else {

    gCurrGhostImgs = gIsFisrtImg ? ghostImgs1 : ghostImgs2
    for (var i = 0; i < gId; i++) {
      document.querySelector(`#g${i}`).setAttribute('src', gCurrGhostImgs[i]);
    }
  }

  gIsFisrtImg = !gIsFisrtImg

}

function eatGhost(ghostLocation) {
  const index = gGhosts.findIndex(
    (ghost) => ghost.location.i == ghostLocation.i && ghost.location.j == ghostLocation.j)
  var ghost = gGhosts.splice(index, 1)[0]
  gEatenGhosts.push(ghost)
}