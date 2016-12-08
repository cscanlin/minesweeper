import React, { Component } from 'react';

class Cell extends Component {

  render() {
    return (
      <div className="Cell">
        <span>({this.props.x}, {this.props.y})</span>
      </div>
    );
  }
}

Cell.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  isMine: React.PropTypes.bool.isRequired,
  isExplored: React.PropTypes.bool.isRequired,
}

export default Cell;
