import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
      <button 
        className="square"
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]}
        // благодаря () => {} контекст сохранен (Board) 
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			history: [{
				squares: Array(9).fill(null),
			}],
			stepNumber: 0,
			xIsNext: true,
		}
	}

	handleClick(i) {
		const history = this.state.history.slice(0, 
			this.state.stepNumber + 1);
    const current = history[history.length - 1];
    // Создаем копию массива, описывающего
    // последний ход, для изменения 
    // состояния у этой копии, а не у оригинала
    const squares = current.squares.slice();

    // Обработка ситуаций где клик нужно заблокировать
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    // Функция для установки state Game-a
    this.setState({
      history: history.concat([{
      	squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
  	const history = this.state.history;
  	const current = history[this.state.stepNumber];
  	const winner = calculateWinner(current.squares);

  	// map() принимает 1-ым аргументом элемент массива,
  	// 2-ым индес этого элемента
  	const moves = history.map((step, move) => {
  		const description = move ? 
  			`Go to move ${move}` :
  			`Go to the game start`;
  		return (
  			<li key={move}>
  				<button
  					onClick={() => this.jumpTo(move)}
  				>
  					{description}	
  				</button>
  			</li>
  		)
  	});

  	let status;
  	if (winner) {
  		status = `Winner: ${winner}`;
  	} else {
  		status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
  	}

    return (
      <div className="game">
        <div className="game-board">
          <Board
          	squares={current.squares}
          	onClick={(i) => {this.handleClick(i)}}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    // Проверка строк
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Проверка столбцов
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Проверка диагоналей
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if ( squares[a] 
      && squares[a] === squares[b] 
      && squares[a] === squares[c] ) {
      return squares[a];
    }
  }

  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
