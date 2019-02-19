import React, {Component} from 'react';
import './App.css';
import Board from "./components/Board";
import StartMenu from "./components/StartMenu";


class App extends Component {

  state = {
    board: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    human: null,
    computer: null,
    turn: null,
    playerCount: null,
    humanFirst: null,
    gameEnded: false
  };

  // Menus and Options
  updatePlayers = (playerCount) => {
    this.setState({playerCount})
  };

  updateMarkers = (human, computer) => {
    this.setState({human, computer})
  };

  updateTurns = (humanFirst, turn) => {
    this.setState({humanFirst, turn})
  };

  returnMenu = () => {
    let newBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.setState({
      board: newBoard,
      human: null,
      computer: null,
      turn: null,
      playerCount: null,
      humanFirst: null,
      gameEnded: false
    })
  };

  resetGame = () => {
    const {playerCount, humanFirst} = this.state;
    let newBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.setState({board: newBoard, gameEnded: false});
    this.unfocusWon();
    if (playerCount === 1 && !humanFirst) {
      this.computerRandom(newBoard)
    }
  };

  // Game Mechanics
  markSquare = (event, index) => {
    event.preventDefault();
    let {human, computer, turn, playerCount, gameEnded} = this.state;
    let newBoard = [...this.state.board];
    if (newBoard[index] !== "X" && newBoard[index] !== "O" && !gameEnded) {
      newBoard[index] = turn;
      if (turn === human) {
        turn = computer
      } else if (turn === computer) {
        turn = human
      }
      this.setState({board: newBoard, turn});
      this.gameWon(newBoard, human);

      if (playerCount === 1) {
        this.computerTurn(newBoard)
      }
      if (playerCount === 2) {
        this.gameWon(newBoard, computer)
      }
    }
  };

  computerTurn = (board) => {
    let {computer, human, turn} = this.state;
    let newBoard = [...board];
    let bestMove = this.miniMax(board, computer).index;
    newBoard[bestMove] = computer;
    turn = human;
    this.gameWon(newBoard, computer);
    this.setState({board: newBoard, turn})
  };

  gameWon = (board, turn) => {
    if (
          (board[0] === turn && board[1] === turn && board[2] === turn) ||
          (board[3] === turn && board[4] === turn && board[5] === turn) ||
          (board[6] === turn && board[7] === turn && board[8] === turn) ||
          (board[0] === turn && board[3] === turn && board[6] === turn) ||
          (board[1] === turn && board[4] === turn && board[7] === turn) ||
          (board[2] === turn && board[5] === turn && board[8] === turn) ||
          (board[0] === turn && board[4] === turn && board[8] === turn) ||
          (board[2] === turn && board[4] === turn && board[6] === turn)
    ) {
      this.setState({gameEnded: true});
      this.focusWon(board, turn)
    } else if (this.findEmptySquares(board).length === 0) {
      this.setState({gameEnded: true})
    }
  };

  // Computer Mechanics
  computerRandom = (board) => {
    let {computer, human} = this.state;
    let randomSquare = Math.floor(Math.random() * 9);
    board[randomSquare] = computer;
    this.setState({board, turn: human})
  };

  findEmptySquares = (board) => {
    let emptySquares = [];
    board.forEach((value, index) => value !== "X" && value !== "O" ? emptySquares.push(index) : null);
    return emptySquares
  };

  checkWin = (board, turn) => {
    if (
          (board[0] === turn && board[1] === turn && board[2] === turn) ||
          (board[3] === turn && board[4] === turn && board[5] === turn) ||
          (board[6] === turn && board[7] === turn && board[8] === turn) ||
          (board[0] === turn && board[3] === turn && board[6] === turn) ||
          (board[1] === turn && board[4] === turn && board[7] === turn) ||
          (board[2] === turn && board[5] === turn && board[8] === turn) ||
          (board[0] === turn && board[4] === turn && board[8] === turn) ||
          (board[2] === turn && board[4] === turn && board[6] === turn)
    ) {
      return true
    } else {
      return false
    }
  };

  miniMax = (board, turn) => {
    const {human, computer} = this.state;
    const newBoard = [...board];
    const emptySquares = this.findEmptySquares(newBoard);
    const moves = [];

    if (this.checkWin(newBoard, human)) {
      return {score: -10}
    } else if (this.checkWin(newBoard, computer)) {
      return {score: 10}
    } else if (emptySquares.length === 0) {
      return {score: 0}
    }

    for (let i = 0; i < emptySquares.length; i++) {
      const move = {};
      move.index = emptySquares[i];
      newBoard[emptySquares[i]] = turn;

      if (turn === computer) {
        const result = this.miniMax(newBoard, human);
        move.score = result.score
      } else {
        const result = this.miniMax(newBoard, computer);
        move.score = result.score
      }
      newBoard[emptySquares[i]] = move.index;
      moves.push(move)
    }

    let bestMove;
    if (turn === computer) {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i
        }
      }
    }
    return moves[bestMove]
  };

  // Visual Mechanics
  focusWon = (board, turn) => {
    if (board[0] === turn && board[1] === turn && board[2] === turn) {
      createSelector(0);
      createSelector(1);
      createSelector(2)
    } else if (board[3] === turn && board[4] === turn && board[5] === turn) {
      createSelector(3);
      createSelector(4);
      createSelector(5)
    } else if (board[6] === turn && board[7] === turn && board[8] === turn) {
      createSelector(6);
      createSelector(7);
      createSelector(8)
    } else if (board[0] === turn && board[3] === turn && board[6] === turn) {
      createSelector(0);
      createSelector(3);
      createSelector(6)
    } else if (board[1] === turn && board[4] === turn && board[7] === turn) {
      createSelector(1);
      createSelector(4);
      createSelector(7)
    } else if (board[2] === turn && board[5] === turn && board[8] === turn) {
      createSelector(2);
      createSelector(5);
      createSelector(8)
    } else if (board[0] === turn && board[4] === turn && board[8] === turn) {
      createSelector(0);
      createSelector(4);
      createSelector(8)
    } else if (board[2] === turn && board[4] === turn && board[6] === turn) {
      createSelector(2);
      createSelector(4);
      createSelector(6)
    }

    function createSelector(num) {
      return document.querySelector(`.button${num}`).style.background = "mediumspringgreen"
    }
  };

  unfocusWon = () => {
    const numbers = Array.from(Array(9).keys());
    for (let num of numbers) {
      createSelector(num)
    }

    function createSelector(num) {
      return document.querySelector(`.button${num}`).style.background = null
    }
  };

  render() {
    return (
          <div className="App">
            <h1 className="main-title">Tic Tac Toe</h1>
            {this.state.humanFirst !== null ? (
                        <Board
                              {...this.state}
                              markSquare={this.markSquare}
                              returnMenu={this.returnMenu}
                              resetGame={this.resetGame}
                              computerRandom={this.computerRandom}
                        />)
                  : null
            }


            <StartMenu
                  {...this.state}
                  updatePlayers={this.updatePlayers}
                  updateMarkers={this.updateMarkers}
                  updateTurns={this.updateTurns}
            />

          </div>
    )
  }
}

export default App;
