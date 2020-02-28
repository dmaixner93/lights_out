import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25
  }
  constructor(props) {
    super(props);
    this.state = {
      hasWon: false,
      board: this.createBoard()
    };
  }

  createBoard() {
    let board = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(Math.random() < this.props.chanceLightStartsOn);
      }
      board.push(row);
    }
    return board
  }
  flipCellsAround(coord) {
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    function flipCell(y, x) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    flipCell(y,x);
    flipCell(y,x - 1);
    flipCell(y,x + 1);
    flipCell(y - 1,x);
    flipCell(y + 1,x);
    let hasWon = board.every(row => row.every(cell => !cell));
    this.setState({board: board, hasWon: hasWon});
  }
  makeBoard() {
    let tblBoard = [];
    for (let y = 0; y < this.props.nrows; y++) {
      let row = [];
      for (let x = 0; x < this.props.ncols; x++) {
        let coord = `${y}-${x}`;
        row.push(<Cell flipCellsAroundMe={() => this.flipCellsAround(coord)} key={coord} isLit={this.state.board[y][x]}/>);
      }
      tblBoard.push(<tr key={y}>{row}</tr>);
    };
    return (
      <table className='Board'>
        <tbody>
          {tblBoard}
        </tbody>
      </table>
    )
  }
  playAgain() {
    this.setState({hasWon: false, board: this.createBoard()});
  }

  render() {
    return (
      <div className='Board-container'>
        {this.state.hasWon ? (
        <div>
          <span className='Neon-blue Shadow-blue Winner'>You</span>
          <span className='Neon-green Shadow-green Winner'>win!</span>
          <br />
          <button className='Board-button' onClick={() => this.playAgain()}>Play Again</button>
        </div>
        ) : (
          <div>
            <div className='Board-title'>
              <span className='Neon-blue Shadow-blue'>Lights</span>
              <span className='Neon-green Shadow-green'>Out</span>
            </div>
            <div>
              {this.makeBoard()}
            </div>
          </div>
        )
      }
      </div>
    )
  }
}

export default Board;