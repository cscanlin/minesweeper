import React, { Component } from 'react';

class Header extends Component {

  leftpad(toPad, len = 3) {
    return toPad.toLocaleString(undefined, {minimumIntegerDigits:len})
  }

  render() {
    return (
      <div className="header">
        <div className="counter">{this.leftpad(this.props.minesRemaining)}</div>
        <div className="state-container" onClick={this.props.resetGame}>
          <div className={this.props.gameState + '-state state-indicator border'}>
          </div>
        </div>
        <div className="counter">{this.leftpad(this.props.timeElapsed)}</div>
      </div>
    )
  }
}

Header.propTypes = {
  minesRemaining: React.PropTypes.number.isRequired,
  gameState: React.PropTypes.string,
  timeElapsed: React.PropTypes.number.isRequired,
  resetGame: React.PropTypes.func.isRequired,
}

export default Header;
