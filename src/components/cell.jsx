import React, { Component } from 'react';

class Cell extends Component {

  onClick(e) {
    if (e.shiftKey || e.ctrlKey || e.altKey) {
      return this.props.markCell(this.props.x, this.props.y)
    } else {
      return this.props.clickCell(this.props.x, this.props.y)
    }
  }

  cellText() {
    return this.props.isMine ? 'X' : this.props.numAdjacent
  }

  cellBackgroundColor() {
    if (this.props.isMine && this.props.isExplored) {
      return '#ff0000'
    } else if (this.props.isFlagged) {
      return  '#ffb2b2'
    } else if (this.props.isQuestion) {
      return  '#cc99ff'
    } else if (this.props.isExplored) {
      return '#bfbfbf'
    } else {
      return '#ededed'
    }
  }

  render() {
    const cellStyle = {
      backgroundColor: this.cellBackgroundColor()
    }
    return (
      <div className="cell" style={cellStyle} onClick={(e) => this.onClick(e)}>
        { this.props.isExplored ? <span className="cell-text">{this.cellText()}</span> : null }
      </div>
    );
  }
}

Cell.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  isMine: React.PropTypes.bool.isRequired,
  isExplored: React.PropTypes.bool.isRequired,
  isFlagged: React.PropTypes.bool.isRequired,
  isQuestion: React.PropTypes.bool.isRequired,
  numAdjacent: React.PropTypes.number,
  clickCell: React.PropTypes.func.isRequired,
  markCell: React.PropTypes.func.isRequired,
}

export default Cell;
