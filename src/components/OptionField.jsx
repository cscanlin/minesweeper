import React, { Component } from 'react'

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
  fieldName: React.PropTypes.string.isRequired,
  fieldValue: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.bool,
  ]).isRequired,
  inputType: React.PropTypes.string.isRequired,
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,
}

export default OptionField
