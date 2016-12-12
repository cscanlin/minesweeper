import React, { Component } from 'react'
import OptionField from './OptionField'

class Options extends Component {

  numberOptionProps() {
    return ['numMines','gridWidth', 'gridHeight']
  }

  render() {
    return (
      <form className="additional-options-container">
        {this.numberOptionProps().map(option => {
          return <OptionField
            key={option}
            fieldName={option}
            inputType='number'
            fieldValue={this.props[option]}
            onBlur={this.props.resetGame}
          />
        })}
        <OptionField
          key='showAllMines'
          fieldName='showAllMines'
          inputType='checkbox'
          fieldValue={this.props.showAllMines}
          onChange={this.props.toggleCheat}
        />
      </form>
    )
  }
}

Options.propTypes = {
  numMines: React.PropTypes.number.isRequired,
  gridWidth: React.PropTypes.number.isRequired,
  gridHeight: React.PropTypes.number.isRequired,
  showAllMines: React.PropTypes.bool.isRequired,
  resetGame: React.PropTypes.func.isRequired,
  toggleCheat: React.PropTypes.func.isRequired,
}

export default Options
