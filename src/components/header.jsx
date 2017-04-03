import React, { Component } from 'react'

class Header extends Component {

  leftpad(toPad, len = 3) {
    return toPad.toLocaleString(undefined, {minimumIntegerDigits:len})
  }

  render() {
    const headerStyle = {fontSize: this.props.gridWidth > 8 ? 'xx-large' : 'large'}
    const indicatorSize = this.props.gridWidth > 8 ? 40 : 20
    const indicatorStyle = {
      width: indicatorSize,
      height: indicatorSize,
    }
    return (
      <div style={headerStyle} className="header">
        <div className="counter">{this.leftpad(this.props.minesRemaining)}</div>
        <div className="state-container" onClick={this.props.onClickStateContainer}>
          <div style={indicatorStyle} className={this.props.gameState + '-state state-indicator border'} />
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
  onClickStateContainer: React.PropTypes.func.isRequired,
  gridWidth: React.PropTypes.number.isRequired,
}

export default Header
