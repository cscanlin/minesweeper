import React, { Component } from 'react';
import Cell from './components/cell';
import Header from './components/header';

const CELLWIDTH = 22

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
      gameState: null,
      timeElapsed: 0,
      gridWidth: 10,
      gridHeight: 10,
      numMines: 10,
      cellData: [],
      timer: null,
    }
    this.exploreCell = this.exploreCell.bind(this)
    this.flagCell = this.flagCell.bind(this)
    this.restartGame = this.restartGame.bind(this)
    this.updateTimer = this.updateTimer.bind(this)
  }

  componentDidMount() {
    this.populateInitialCellData()
  }

  numUnminedCells() {
    return (this.state.gridWidth * this.state.gridHeight) - this.state.numMines
  }

  getflaggedCells() {
    return this.state.cellData.filter(cell => cell.isFlagged)
  }

  numUnflaggedRemaining() {
    return this.state.numMines - this.getflaggedCells().length
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
    for (var row = 0; row < this.state.gridHeight; row++) {
      for (var col = 0; col < this.state.gridWidth; col++) {
        var isMine = (Math.random() <= minesNeeded / spacesRemaining) && minesNeeded > 0
        cells.push({x: col, y: row, isMine: isMine, isExplored: false, isFlagged: false, numAdjacent: null})
        spacesRemaining -= 1
        if (isMine) {
          minesNeeded -= 1
        }
      }
    }
    return this.setState({cellData: this.setNumAdjacent(cells)})
  }

  setNumAdjacent(allCells) {
    return allCells.map(cell => {
      var numAdjacent = this.getAdjacentCells(cell, allCells).filter(adjCell => adjCell.isMine).length
      cell.numAdjacent = numAdjacent ? numAdjacent: null
      return cell
    })
  }

  startTimer() {
    this.setState({gameState: 'playing', timer: setInterval(this.updateTimer, 1000)})
  }
  updateTimer() {
    this.setState({timeElapsed: this.state.timeElapsed + 1})
  }

  exploreCell(x, y) {
    if (this.state.cellData.filter(cell => cell.isExplored).length === 0) {
      this.startTimer()
    }
    var cellData = this.state.cellData
    var cellIndex = cellData.findIndex(cell => cell.x === x && cell.y === y)
    if (cellData[cellIndex].isFlagged) {
      return
    }
    cellData[cellIndex].isExplored = true
    this.setState({cellData : cellData})
    var cell = cellData[cellIndex]
    if (!cell.numAdjacent && !cell.isMine) {
      this.getAdjacentCells(cell, this.state.cellData).filter(adjCell => !adjCell.isExplored).forEach(adjCell =>
        this.exploreCell(adjCell.x, adjCell.y)
      )
    }
    if (cell.isMine) {
      this.gameLost()
    } else if (cellData.filter(cell => cell.isExplored).length === this.numUnminedCells()) {
      this.gameWon()
    }
  }

  flagCell(x, y) {
    var cellData = this.state.cellData
    var cellIndex = cellData.findIndex(cell => cell.x === x && cell.y === y)
    cellData[cellIndex].isFlagged = true
    this.setState({cellData : cellData})
  }

  gameLost() {
      console.log('LOST');
      clearInterval(this.state.timer);
      this.state.cellData.forEach(cell =>
        cell.isExplored = true
      )
      this.setState({gameState: 'lost', cellData: this.state.cellData})
      console.log(this.state.gameState);
  }

  gameWon() {
      console.log('WON');
      clearInterval(this.state.timer);
      this.setState({gameState: 'won'})
      console.log(this.state.gameState);
  }

  restartGame() {
    clearInterval(this.state.timer);
    this.setState({timeElapsed: 0})
    this.populateInitialCellData()
  }

  render() {
    const rowsNums = Array(this.state.gridHeight).fill().map((_, row) => row)
    const viewportWidth = this.state.gridWidth * CELLWIDTH
    return (
      <div className='app' style={ {width: viewportWidth} }>
        <Header
          minesRemaining={this.numUnflaggedRemaining()}
          gameState={this.state.gameState}
          timeElapsed={this.state.timeElapsed}
          restartGame={this.restartGame}
        />
      <div className="grid">
          {rowsNums.map((row) =>
            <div key={row} className="row">
              {this.state.cellData.filter(cell => cell.y === row).sort((a, b) => a.x > b.x).map((cell, col) =>
                <Cell key={(row, col)} {...cell} exploreCell={this.exploreCell} flagCell={this.flagCell}/>
              )}
            </div>
          )}
        </div>
    </div>
    );
  }
}

export default App;
