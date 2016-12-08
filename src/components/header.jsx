import React, { Component } from 'react';

class Header extends Component {

  leftpad(toPad, len = 3) {
    return toPad.toLocaleString(undefined, {minimumIntegerDigits:len})
  }

  render() {
    return (
      <div className="header">
        <div className="counter">{this.leftpad(this.props.minesRemaining)}</div>
        <div className="state" onClick={this.props.restartGame}>{this.props.gameState}</div>
        <div className="counter">{this.leftpad(this.props.timeElapsed)}</div>
      </div>
    )
  }
}

Header.propTypes = {
  minesRemaining: React.PropTypes.number.isRequired,
  gameState: React.PropTypes.string,
  timeElapsed: React.PropTypes.number.isRequired,
  restartGame: React.PropTypes.func.isRequired,
}

export default Header;
