import React, { Component } from 'react';
import Header from './components/Header';
import Grid from './components/Grid';
import {getCellIndexByCoordinates, getAdjacentCells, createGridCells} from './utils/cellUtils';

const CELLWIDTH = 22

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameState: null,
      timeElapsed: 0,
      numMines: null,
      gridWidth: null,
      gridHeight: null,
      cellData: [],
      timer: null,
    }
    this.clickCell = this.clickCell.bind(this)
    this.exploreCell = this.exploreCell.bind(this)
    this.markCell = this.markCell.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.updateTimer = this.updateTimer.bind(this)
  }

  componentDidMount() {
    this.resetGame()
  }

  setInititialCellData() {
    const cellData = createGridCells(this.state.numMines, this.state.gridWidth, this.state.gridHeight)
    this.setState({cellData: cellData})
  }

  numSafeCells() {
    return (this.state.gridWidth * this.state.gridHeight) - this.state.numMines
  }

  getflaggedCells() {
    return this.state.cellData.filter(cell => cell.isFlagged)
  }

  numUnflaggedRemaining() {
    return this.state.numMines - this.getflaggedCells().length
  }

  loadOptions(callback) {
    this.setState({gridWidth: 10, gridHeight: 10, numMines: 10}, callback)
  }

  startTimer() {
    this.setState({gameState: 'playing', timer: setInterval(this.updateTimer, 1000)})
  }
  updateTimer() {
    this.setState({timeElapsed: this.state.timeElapsed + 1})
  }

  clickCell(x, y) {
    if (this.state.gameState !== 'playing') {
      this.startTimer()
    }
    var cell = this.exploreCell(x, y)
    if (cell.isMine) {
      this.gameLost()
    } else if (this.state.cellData.filter(cell => cell.isExplored).length === this.numSafeCells()) {
      this.gameWon()
    }
  }

  exploreCell(x, y) {
    const cellIndex = getCellIndexByCoordinates(x, y, this.state.cellData)
    const cell = this.state.cellData[cellIndex]
    if (cell.isFlagged || cell.isQuestion) {
      return
    }
    cell.isExplored = true
    this.state.cellData[cellIndex] = cell
    this.setState({cellData: this.state.cellData})
    if (!cell.numAdjacent && !cell.isMine) {
      getAdjacentCells(cell, this.state.cellData)
        .filter(adjCell => !adjCell.isExplored)
        .forEach(adjCell => this.exploreCell(adjCell.x, adjCell.y))
    }
    return cell

  }

  markCell(x, y) {
    const cellIndex = getCellIndexByCoordinates(x, y, this.state.cellData)
    const cell = this.state.cellData[cellIndex]
    if (!cell.isFlagged && !cell.isQuestion) {
      cell.isFlagged = true
    } else if (cell.isFlagged){
      cell.isFlagged = false
      cell.isQuestion = true
    } else {
      cell.isQuestion = false
    }
    this.state.cellData[cellIndex] = cell
    this.setState({cellData : this.state.cellData})
  }

  gameLost() {
      clearInterval(this.state.timer);
      this.state.cellData.forEach(cell =>
        cell.isExplored = true
      )
      this.setState({gameState: 'lost', cellData: this.state.cellData})
  }

  gameWon() {
      clearInterval(this.state.timer);
      this.setState({gameState: 'won'})
  }

  resetGame() {
    clearInterval(this.state.timer);
    this.setState({gameState: null, timeElapsed: 0})
    this.loadOptions(this.setInititialCellData)
  }

  render() {

    return (
      <div className='app' style={ {width: this.state.gridWidth * CELLWIDTH} }>
        <Header
          minesRemaining={this.numUnflaggedRemaining()}
          gameState={this.state.gameState}
          timeElapsed={this.state.timeElapsed}
          resetGame={this.resetGame}
        />
        <Grid
          gridHeight={this.state.gridHeight}
          cellData={this.state.cellData}
          clickCell={this.clickCell}
          markCell={this.markCell}
        />
    </div>
    );
  }
}

export default App;
