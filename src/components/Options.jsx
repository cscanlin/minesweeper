import React, { Component } from 'react';
import OptionField from './OptionField';

class Options extends Component {

  optionProps() {
    return ['numMines','gridWidth', 'gridHeight']
  }

  render() {
    return (
      <form className="additional-options-container">
        {this.optionProps().map(option => {
          return <OptionField
            key={option}
            fieldName={option}
            fieldValue={this.props[option]}
            resetGame={this.props.resetGame}
          />
        })}
      </form>
    )
  }
}

Options.propTypes = {
  numMines: React.PropTypes.number.isRequired,
  gridWidth: React.PropTypes.number.isRequired,
  gridHeight: React.PropTypes.number.isRequired,
  resetGame: React.PropTypes.func.isRequired,
}

export default Options;
