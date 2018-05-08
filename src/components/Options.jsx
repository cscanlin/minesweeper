import React, { Component } from 'react'
import PropTypes from 'prop-types'

import OptionField from './OptionField'

class Options extends Component {

  numberOptionMap() {
    return {
      gridWidth: {min: 5, max: 40},
      gridHeight: {min: 5, max: 30},
      numMines: {min: 1, max: this.props.gridWidth * this.props.gridHeight - 1},
    }
  }

  render() {
    const numberOptionMap = this.numberOptionMap()
    return (
      <form className="additional-options-container">
        {Object.entries(numberOptionMap).map(([option, optionConf]) => (
          <OptionField
            key={option}
            fieldName={option}
            inputType='number'
            fieldValue={this.props[option]}
            min={optionConf.min}
            max={optionConf.max}
            onBlur={this.props.resetGame}
          />
        ))}
        <OptionField
          key='showAllMines'
          fieldName='showAllMines'
          inputType='checkbox'
          fieldValue={this.props.showAllMines}
          onChange={this.props.toggleCheat}
        />
        <OptionField
          key='showMineOdds'
          fieldName='showMineOdds'
          inputType='checkbox'
          fieldValue={this.props.showMineOdds}
          onChange={this.props.toggleOdds}
        />
      </form>
    )
  }
}

Options.propTypes = {
  resetGame: PropTypes.func.isRequired,
  numMines: PropTypes.number.isRequired,
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,
  showAllMines: PropTypes.bool.isRequired,
  toggleCheat: PropTypes.func.isRequired,
  showMineOdds: PropTypes.bool.isRequired,
  toggleOdds: PropTypes.func.isRequired,
}

export default Options
