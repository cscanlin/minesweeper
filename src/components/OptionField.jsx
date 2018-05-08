import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OptionField extends Component {

  render() {
    return (
      <div className="option">
        <label htmlFor={this.props.fieldName}>{this.props.fieldName}</label>
        <input
          id={this.props.fieldName}
          type={this.props.inputType}
          className={'additional-options-input'}
          defaultValue={this.props.fieldValue}
          onBlur={this.props.onBlur}
          onChange={this.props.onChange}
        />
      </div>
    )
  }
}

OptionField.propTypes = {
  fieldName: PropTypes.string.isRequired,
  fieldValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  inputType: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
}

export default OptionField
