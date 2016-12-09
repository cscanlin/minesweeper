import React, { Component } from 'react'
import Header from './Header'
import Grid from './Grid'
import Options from './Options'
import {getCellIndexByCoordinates, getAdjacentCells, createGridCells} from '../utils/cellUtils'

const CELLWIDTH = 22

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gameState: null,
      timeElapsed: 0,
      numMines: 10,
      gridWidth: 10,
      gridHeight: 10,
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

  loadOptionFromEvent(e, callback) {
    this.setState({[e.target.id]: parseInt(e.target.value)}, callback)
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

  startGame() {
    this.setState({gameState: 'playing', timer: setInterval(this.updateTimer, 1000)})
  }

  updateTimer() {
    if (this.state.gameState === 'playing') {
      this.setState({timeElapsed: this.state.timeElapsed + 1})
    }
  }

  clickCell(x, y) {
    if (this.state.gameState === 'won' || this.state.gameState === 'lost') {
      return
    }
    else if (!this.state.gameState) {
      this.startGame()
    }
    var cell = this.exploreCell(x, y)
    if (cell.isMine) {
      this.gameLost()
    } else if (this.state.cellData.filter(cell => cell.isExplored).length === this.numSafeCells()) {
      this.gameWon()
    }
  }

  exploreCell(x, y) {
    const cellData = this.state.cellData
    const cellIndex = getCellIndexByCoordinates(x, y, cellData)
    // const cellIndex = parseInt(y.toString() + x.toString()) // hacky shortcut
    const cell = cellData[cellIndex]
    if (cell.isFlagged || cell.isQuestion) {
      return
    }
    cell.isExplored = true
    cellData[cellIndex] = cell
    this.setState({cellData: cellData})
    if (!cell.numAdjacent && !cell.isMine) {
      getAdjacentCells(cell, cellData)
        .filter(adjCell => !adjCell.isExplored)
        .forEach(adjCell => this.exploreCell(adjCell.x, adjCell.y))
    }
    return cell

  }

  markCell(x, y) {
    const cellData = this.state.cellData
    const cellIndex = getCellIndexByCoordinates(x, y, cellData)
    const cell = cellData[cellIndex]
    if (!cell.isFlagged && !cell.isQuestion) {
      cell.isFlagged = true
    } else if (cell.isFlagged){
      cell.isFlagged = false
      cell.isQuestion = true
    } else {
      cell.isQuestion = false
    }
    cellData[cellIndex] = cell
    this.setState({cellData : cellData})
  }

  gameLost() {
      clearInterval(this.state.timer)
      this.state.cellData.forEach(cell =>
        cell.isExplored = true
      )
      this.setState({gameState: 'lost', cellData: this.state.cellData})
  }

  gameWon() {
      clearInterval(this.state.timer)
      this.setState({gameState: 'won'})
  }

  resetGame(e) {
    clearInterval(this.state.timer)
    this.setState({gameState: null, timeElapsed: 0})
    if (e && e.type === 'blur') {
      this.loadOptionFromEvent(e, this.setInititialCellData)
    } else {
      this.setInititialCellData()
    }
  }

  render() {
    return (
      <div className='app' style={ {width: this.state.gridWidth * CELLWIDTH} }>
        <div className='game-container border'>
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
        <Options
          numMines={this.state.numMines}
          gridWidth={this.state.gridWidth}
          gridHeight={this.state.gridHeight}
          resetGame={this.resetGame}
        />
      </div>
    )
  }
}

export default App
