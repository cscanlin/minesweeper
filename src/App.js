import React, { Component } from 'react';
import Cell from './components/cell';

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

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gridWidth: 10,
      gridHeight: 10,
      numMines: 10,
      cellData: [],
    }
    this.exploreCell = this.exploreCell.bind(this)
  }

  componentDidMount() {
    this.setState({cellData: this.populateInitialCellData()})
  }

  getAdjacentCells(centerCell, allCells) {
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

  populateInitialCellData() {
    var cells = []
    var minesNeeded = this.state.numMines
    var spacesRemaining = this.state.gridWidth * this.state.gridHeight
    for (var h = 0; h < this.state.gridHeight; h++) {
      for (var w = 0; w < this.state.gridWidth; w++) {
        var isMine = (Math.random() <= minesNeeded / spacesRemaining) && minesNeeded > 0
        cells.push({x: w, y: h, isMine: isMine, isExplored: false, isFlagged: false, numAdjacent: null})
        if (isMine) {
          minesNeeded -=1
        }
        spacesRemaining -=1
      }
    }
    return this.setNumAdjacent(cells)
  }

  setNumAdjacent(allCells) {
    return allCells.map(cell => {
      var numAdjacent = this.getAdjacentCells(cell, allCells).filter(adjCell => adjCell.isMine).length
      cell.numAdjacent = numAdjacent ? numAdjacent: null
      return cell
    })
  }

  exploreCell(x, y) {
    var cellData = this.state.cellData
    var cellIndex = cellData.findIndex(cell => cell.x === x && cell.y === y)
    cellData[cellIndex].isExplored = true
    this.setState({cellData : cellData})
    var cell = cellData[cellIndex]
    if (!cell.numAdjacent && !cell.isMine) {
      this.getAdjacentCells(cell, this.state.cellData).filter(adjCell => !adjCell.isExplored).forEach(adjCell =>
        this.exploreCell(adjCell.x, adjCell.y)
      )
    }
    if (cell.isMine) {
      console.log('game over!');
    }
  }

  render() {
    const rowsNums = Array(this.state.gridHeight).fill().map((_, row) => row)
    return (
      <div className="App">
        <div className="grid">
          {rowsNums.map((row) =>
            <div key={row} className="row">
              {this.state.cellData.filter(cell => cell.y === row).sort((a, b) => a.x > b.x).map((cell, col) =>
                <Cell key={(row, col)} {...cell} exploreCell={this.exploreCell}/>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
