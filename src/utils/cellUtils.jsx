const adjacentDirections = {
  N: {x: 0, y:1},
  NE: {x: 1, y:1},
  E: {x: 1, y:0},
  SE: {x: 1, y:-1},
  S: {x: 0, y:-1},
  SW: {x: -1, y:-1},
  W: {x: -1, y:0},
  NW: {x: -1, y:1},
}

export const getCellIndexByCoordinates = (x, y, allCells) => {
  return allCells.findIndex(cell => cell.x === x && cell.y === y)
}

export const getAdjacentCells = (centerCell, allCells) => {
  var adjacentCells = []
  for (var direction in adjacentDirections) {
    const cellIndex = getCellIndexByCoordinates(
      centerCell.x + adjacentDirections[direction].x,
      centerCell.y + adjacentDirections[direction].y,
      allCells
    )
    if (cellIndex > -1) {
      adjacentCells.push(allCells[cellIndex])
    }
  }
  return adjacentCells
}

const setNumAdjacent = (allCells, numRows) => {
  return allCells.map(cell => {
    const numAdjacent = getAdjacentCells(cell, allCells).filter(adjCell => adjCell.isMine).length
    cell.numAdjacent = numAdjacent ? numAdjacent: null
    return cell
  })
}

export const createGridCells = (minesNeeded, gridWidth, gridHeight) => {
  var cells = []
  var spacesRemaining = gridWidth * gridHeight
  for (var row = 0; row < gridHeight; row++) {
    for (var col = 0; col < gridWidth; col++) {
      var isMine = (Math.random() <= minesNeeded / spacesRemaining) && minesNeeded > 0
      cells.push({
        x: col,
        y: row,
        isMine: isMine,
        isExplored: false,
        isFlagged: false,
        isQuestion: false,
        numAdjacent: null,
      })
      spacesRemaining -= 1
      if (isMine) {
        minesNeeded -= 1
      }
    }
  }
  return setNumAdjacent(cells, gridHeight)
}

export const validateGame = (allCells, numMines) => {
  var correctCells = 0
  var exploredCells = 0
  allCells.forEach(cell => {
    exploredCells += cell.isExplored ? 1 : 0
    if (cell.isMine && !cell.isFlagged && !cell.isQuestion) {
      return false
    } else if (cell.isMine && cell.isFlagged) {
      correctCells += 1
    }
  })
  return correctCells === numMines || exploredCells === allCells.length - numMines
}
