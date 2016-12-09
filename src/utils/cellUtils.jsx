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
    var xDiff = adjacentDirections[direction].x
    var yDiff = adjacentDirections[direction].y
    var adjCell = allCells.find(adjCell => adjCell.x === centerCell.x + xDiff && adjCell.y === centerCell.y + yDiff)
    if (adjCell) {
      adjacentCells.push(adjCell)
    }
  }
  return adjacentCells
}

const setNumAdjacent = (allCells) => {
  return allCells.map(cell => {
    var numAdjacent = getAdjacentCells(cell, allCells).filter(adjCell => adjCell.isMine).length
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
  return setNumAdjacent(cells)
}
