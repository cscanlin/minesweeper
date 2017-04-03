import React, { Component } from 'react'
import Header from './Header'
import Grid from './Grid'
import Options from './Options'
import {getCellIndexByCoordinates, getAdjacentCells, createGridCells, validateGame} from '../utils/cellUtils'

const CELLWIDTH = 22

class Game extends Component {
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
      showAllMines: false,
    }
    this.clickCell = this.clickCell.bind(this)
    this.exploreCell = this.exploreCell.bind(this)
    this.markCell = this.markCell.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.onClickStateContainer = this.onClickStateContainer.bind(this)
    this.updateTimer = this.updateTimer.bind(this)
    this.toggleCheat = this.toggleCheat.bind(this)
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

  toggleCheat() {
    this.setState({showAllMines: !this.state.showAllMines})
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
    } else if (validateGame(this.state.cellData, this.state.numMines)) {
      this.gameWon()
    }
  }

  exploreCell(x, y) {
    const cellData = this.state.cellData
    const cellIndex = getCellIndexByCoordinates(x, y, cellData)
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
    if (cell.isExplored) {
      return
    }else if (!cell.isFlagged && !cell.isQuestion) {
      cell.isFlagged = true
    } else if (cell.isFlagged){
      cell.isFlagged = false
      if (this.props.allowQuestion) {
        cell.isQuestion = true
      }
    } else {
      cell.isQuestion = false
    }
    cellData[cellIndex] = cell
    this.setState({cellData : cellData})
  }

  onClickStateContainer() {
    if (this.state.gameState === 'playing') {
      return validateGame(this.state.cellData, this.state.numMines) ? this.gameWon() : this.gameLost()
    } else {
      return this.resetGame()
    }
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
      this.state.cellData.forEach(cell =>
        cell.isExplored = true
      )
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
            onClickStateContainer={this.onClickStateContainer}
          />
          <Grid
            gridHeight={this.state.gridHeight}
            cellData={this.state.cellData}
            clickCell={this.clickCell}
            markCell={this.markCell}
            showAllMines={this.state.showAllMines}
            gameState={this.state.gameState}
          />
        </div>
        <Options
          numMines={this.state.numMines}
          gridWidth={this.state.gridWidth}
          gridHeight={this.state.gridHeight}
          showAllMines={this.state.showAllMines}
          resetGame={this.resetGame}
          toggleCheat={this.toggleCheat}
        />
      </div>
    )
  }
}

Game.defaultProps = {
  allowQuestion: true,
}

Game.propTypes = {
  allowQuestion: React.PropTypes.bool.isRequired,
}


export default Game
