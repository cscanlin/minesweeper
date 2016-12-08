import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cell from './components/cell';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      gridWidth: 10,
      gridHeight: 10,
      numMines: 10,
      cellData: [],
    }
  }

  componentDidMount() {
    this.setState({cellData: this.populateInitialCellData()})
  }

  populateInitialCellData() {
    var cells = []
    var minesNeeded = this.state.numMines
    var spacesRemaining = this.state.gridWidth * this.state.gridHeight
    for (var h = 0; h < this.state.gridHeight; h++) {
      for (var w = 0; w < this.state.gridWidth; w++) {
        var isMine = (Math.random() <= spacesRemaining / minesNeeded) && minesNeeded > 0
        cells.push({x: w, y: h, isMine: isMine, isExplored: false})
        if (isMine) {
          minesNeeded -=1
        }
        spacesRemaining -=1
      }
    }
    return cells
  }

  render() {
    var cells = this.state.cellData
    const rowsNums = Array(this.state.gridHeight).fill().map((_, i) => i)
    return (
      <div className="App">
        <div className="grid">
          {rowsNums.map((r) =>
            <div className="row">
              {cells.filter(cell => cell.y === r).sort((a, b) => a.x > b.x).map((cell, i) =>
                <Cell key={i} {...cell} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
