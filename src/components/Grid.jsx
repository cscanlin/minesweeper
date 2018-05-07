import React, { Component } from 'react'
import Cell from './Cell'

class Grid extends Component {

  orderedCellsByRow(row) {
    return this.props.cellData.filter(cell => cell.y === row).sort((a, b) => a.x - b.x)
  }

  render() {
    const rowsNums = Array(this.props.gridHeight).fill().map((_, row) => row)
    return (
      <div className="grid">
        {rowsNums.map((row) =>
          <div key={row} className="row">
            {this.orderedCellsByRow(row).map((cell, col) =>
              <Cell
                key={(row, col)}
                showAllMines={this.props.showAllMines}
                showMineOdds={this.props.showMineOdds}
                clickCell={this.props.clickCell}
                markCell={this.props.markCell}
                gameState={this.props.gameState}
                {...cell}
              />
            )}
          </div>
        )}
      </div>
    )
  }
}


Grid.propTypes = {
  gridHeight: React.PropTypes.number.isRequired,
  cellData: React.PropTypes.array,
  clickCell: React.PropTypes.func.isRequired,
  markCell: React.PropTypes.func.isRequired,
  showAllMines: React.PropTypes.bool.isRequired,
  showMineOdds: React.PropTypes.bool.isRequired,
  gameState: React.PropTypes.string,
}

export default Grid
