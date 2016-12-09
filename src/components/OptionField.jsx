import React, { Component } from 'react'

class OptionField extends Component {

  render() {
    return (
      <div className="option">
        <label htmlFor={this.props.fieldName}>{this.props.fieldName}</label>
        <input
          id={this.props.fieldName}
          type='number'
          className={'additional-options-input'}
          defaultValue={this.props.fieldValue}
          onBlur={this.props.resetGame}
        />
      </div>
    )
  }
}

OptionField.propTypes = {
  fieldName: React.PropTypes.string.isRequired,
  fieldValue: React.PropTypes.number.isRequired,
  resetGame: React.PropTypes.func.isRequired,
}

export default OptionField
