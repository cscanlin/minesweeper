import React, { Component } from 'react'
import Cell from './Cell'

class Grid extends Component {
  render() {
    const rowsNums = Array(this.props.gridHeight).fill().map((_, row) => row)
    return (
      <div className="grid">
        {rowsNums.map((row) =>
          <div key={row} className="row">
            {this.props.cellData.filter(cell => cell.y === row).sort((a, b) => a.x - b.x).map((cell, col) =>
              <Cell key={(row, col)} {...cell} clickCell={this.props.clickCell} markCell={this.props.markCell}/>
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
}

export default Grid
