import React, { Component } from 'react';

class Cell extends Component {

  onClick() {
    return this.props.exploreCell(this.props.x, this.props.y)
  }

  cellText() {
    return this.props.isMine ? 'X' : this.props.numAdjacent
  }

  cellBackgroundColor() {
    if (this.props.isMine && this.props.isExplored) {
      return '#ff0000'
    } else {
      return this.props.isExplored ? '#bfbfbf' : '#ededed'
    }
  }

  render() {
    const cellStyle = {
      backgroundColor: this.cellBackgroundColor()
    }
    return (
      <div className="cell" style={cellStyle} onClick={() => this.onClick()}>
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
  numAdjacent: React.PropTypes.number,
  exploreCell: React.PropTypes.func.isRequired,
}

export default Cell;
