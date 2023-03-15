const player = (name,symbol) => {
    let playerName = name;
    const greetPlayer = () => console.log(`${name} has entered the game`);
    const setName = (newName) => playerName = newName;
    const getName = playerName;
    const marker = symbol;
    return {greetPlayer, setName, getName, marker};
}

const playerOne = player('playerOne', 'X');
const playerTwo = player('playerTwo', 'O');

const gameBoard = (() => {
    const board = [];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            board.push([i, j]);
        }
    }

    const resetGameBoard = () => {
        let boardGrid = document.getElementById("game-board");
        boardGrid.replaceChildren();
        for (const i of board) {
            let newSquare = document.createElement('button');
            newSquare.className = 'game-square';
            newSquare.id = `${i}`;
            newSquare.dataset.row = i[0];
            newSquare.dataset.column = i[1];
            newSquare.textContent = `${newSquare.dataset.row}  + ${newSquare.dataset.column}`;
            newSquare.addEventListener('click',() => {
                makePlay(i);
            }, false);
            boardGrid.appendChild(newSquare);   
        }
        currentPlayer = playerOne;
    };

    let currentPlayer = playerOne;
    const getCurrentPlayer = () => currentPlayer.getName;
    const getCurrentMarker = () => currentPlayer.marker;

    const setCurrentPlayer = () => {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
        } else if (currentPlayer === playerTwo) {
            currentPlayer = playerOne;
        }
    };

    

    const makePlay = (square) => {
        let getSquare = document.getElementById(square);
        if (getSquare.textContent !== 'X' && getSquare.textContent !== 'O') {
            getSquare.textContent = currentPlayer.marker;
            gameController.update(square, currentPlayer);
        }
    };

    return {
        board,
        makePlay,
        resetGameBoard,
        getCurrentPlayer,
        getCurrentMarker,
        setCurrentPlayer,
    };
})();

const gameController = ( () => {    
    const _checkRow = (square, player) => {
        const currentBoard = gameBoard.board;
        let winningSquares = [];
        for (const i of currentBoard) {
            if (i[0] === square[0]) {
                const checkRowSquare = document.getElementById(i);
                if (checkRowSquare.textContent !== player.marker) {
                    break;
                } else {
                    winningSquares.push(i);
                }
            }
        }
        if (winningSquares.length === 3) {
            for (const j of winningSquares) {
                const wSquare = document.getElementById(j);
                wSquare.classList.add('winning-square');
            }
            return true;
        } else {
            return false;
        }
    }

    const _checkColumn = (square, player) => {
        const currentBoard = gameBoard.board;
        let winningSquares = [];
        for (const i of currentBoard) {
            if (i[1] === square[1]) {
                const checkRowSquare = document.getElementById(i);
                if (checkRowSquare.textContent !== player.marker) {
                    break;
                } else {
                    winningSquares.push(i);
                }
            }
        }
        if (winningSquares.length === 3) {
            for (const j of winningSquares) {
                const wSquare = document.getElementById(j);
                wSquare.classList.add('winning-square');
            }
            return true;
        } else {
            return false;
        }
    }

    const _checkWinner = (square, player) => {
        
        if (_checkRow(square, player)) {
            console.log(`${square} + ${player.getName}`);
        } else if (_checkColumn(square, player)) {
            console.log(`${square} + ${player.getName}`);
        }
    };

    const _changeDisplay = () => {
        let scoreBoard = document.querySelector('.game-info');
        scoreBoard.replaceChildren();
        scoreBoard.textContent = `Current Move: ${gameBoard.getCurrentPlayer()} (${gameBoard.getCurrentMarker()})`;
    };

    const update = (square, player) => {
        if (square) {
            _checkWinner(square, player);
            gameBoard.setCurrentPlayer();
        }
        _changeDisplay();
    }

    return {
        update,
    };
})();


gameBoard.resetGameBoard();
gameController.update();