import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
