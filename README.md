Minesweeper built with React, initialized with https://github.com/facebookincubator/create-react-app

See it live at: https://cscanlin.github.io/minesweeper/

# To Run

```
git clone https://github.com/cscanlin/minesweeper.git
cd minesweeper
npm install
npm start
```

This project is divided into 6 components:
- Game
  - Header
  - Grid
    - Cell
  - Options
    - OptionField

All of the state lives at the top level Game component. I decided not to use any kind of flux architecture for this app because it felt a little overkill, and holding the state in on component serves a similar enough purpose.

For the grid, I to only have one layer of sub-component (Cell) and skip any kind of row component layer. The cellData is a flat array of objects with each Cell having a set of x,y coordinates and some other data. Having x,y coordinates is convenient because it allows us to ignore array ordering if desired. As a side note, none of my code so far actually changes the initial array ordering, so I do have a function to perform a fast index lookup calculation (`(numRows * y) + (x)`). In most places, I elected to go with a slightly safer API that searches the array by coordinates, even at the cost of some speed.

Another important choice made is the that numAdjacent is set on each mine directly after the initial cell/mine data are planted. By calculating at the beginning, we can use the fast lookup mentioned above with full safety. It also marginally improves the responsiveness of each click, at the cost of a small initial delay.

The final major choice was the exploration algorithm that recursively calls itself on each surrounding cell when a blank cell is clicked.

The only major thing that I didn't have time to write is any tests, besides the default. I'm planning to spend some time tomorrow (Monday) getting at least some basic tests written.

Please let me know if you have any questions or issues running it!
