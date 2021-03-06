import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Cell extends Component {

  onClick(e) {
    if (e.shiftKey || e.ctrlKey || e.altKey) {
      return this.props.markCell(this.props.x, this.props.y)
    } else {
      return this.props.clickCell(this.props.x, this.props.y)
    }
  }

  cellText() {
    if (this.props.isExplored) {
      return <span className="cell-text">{this.props.isMine ? 'X' : this.props.numAdjacent}</span>
    } else if (this.props.showMineOdds) {
      return <span className="cell-text" style={{fontSize: 'x-small'}}>{this.props.mineOdds}</span>
    }
  }

  cellBackgroundColor() {
    if (this.props.isFlagged || (this.props.gameState === 'won' && this.props.isMine)) {
      return  '#ffb2b2'
    } else if (this.props.isMine && (this.props.isExplored || this.props.showAllMines)) {
      return '#ff0000'
    } else if (this.props.isQuestion) {
      return  '#cc99ff'
    } else if (this.props.isExplored) {
      return '#bfbfbf'
    } else {
      return '#ededed'
    }
  }
  cellTextColor() {
    if (this.props.showMineOdds && !this.props.isExplored) {
      return '#000000'
    }
    const textColors = {
      1: '#0004fc',
      2: '#008000',
      3: '#fc0000',
      4: '#000280',
      5: '#800101',
      6: '#00807d',
      7: '#000000',
      8: '#808080',
    }
    return textColors[this.props.numAdjacent]
  }

  render() {
    const cellStyle = {
      backgroundColor: this.cellBackgroundColor(),
      color: this.props.isMine ? '#000000' : this.cellTextColor(),
    }
    return (
      <div className="cell border" style={cellStyle} onClick={(e) => this.onClick(e)}>
        {this.cellText()}
      </div>
    )
  }
}
//

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  isMine: PropTypes.bool.isRequired,
  isExplored: PropTypes.bool.isRequired,
  isFlagged: PropTypes.bool.isRequired,
  isQuestion: PropTypes.bool.isRequired,
  numAdjacent: PropTypes.number,
  clickCell: PropTypes.func.isRequired,
  markCell: PropTypes.func.isRequired,
  showAllMines: PropTypes.bool.isRequired,
  showMineOdds: PropTypes.bool.isRequired,
  mineOdds: PropTypes.number,
  gameState: PropTypes.string,
}

export default Cell
