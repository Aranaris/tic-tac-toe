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
            // newSquare.textContent = `${newSquare.dataset.row}  + ${newSquare.dataset.column}`;
            newSquare.addEventListener('click',() => {
                makePlay(i);
            }, false);
            boardGrid.appendChild(newSquare);   
        }
        currentPlayer = playerOne;
        gameController.update();
        
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
    let currentTurn = 0;
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

    const _checkDiag = (square, player) => {
        const topLeftDiagonal = ['0,0', '1,1', '2,2'];
        const topRightDiagonal = ['2,0', '1,1', '0,2'];
        let winningSquares = [];
        if (topLeftDiagonal.includes(square.toString())) {
            for (const i of topLeftDiagonal) {
                const checkRowSquare = document.getElementById(i);
                if (checkRowSquare.textContent !== player.marker) {
                    winningSquares = [];
                    break;
                } else {
                    winningSquares.push(i);
                }
            }
        }
        if (topRightDiagonal.includes(square.toString())) {
            for (const j of topRightDiagonal) {
                const checkRowSquare = document.getElementById(j);
                if (checkRowSquare.textContent !== player.marker) {
                    winningSquares = [];
                    break;
                } else {
                    winningSquares.push(j);
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
            return true;
        } else if (_checkColumn(square, player)) {
            return true;
        } else if (_checkDiag(square, player)) {
            return true;
        } else {
            return false;
        }
    };

    const _changeDisplay = (winner) => {
        let scoreBoard = document.querySelector('.game-info');
        scoreBoard.replaceChildren();
        if (winner) {
            scoreBoard.textContent = `${winner.getName} wins!`;
            for (const i of gameBoard.board) {
                let disableButton = document.getElementById(i);
                disableButton.disabled = true;
            }
            currentTurn = 0;
        } else if (currentTurn === 9){
            scoreBoard.textContent = `It's a tie!`;
            for (const i of gameBoard.board) {
                let disableButton = document.getElementById(i);
                disableButton.disabled = true;
            }
            currentTurn = 0;
        } else {
            currentTurn += 1;
            scoreBoard.textContent = `Current Turn: ${currentTurn} Current Move: ${gameBoard.getCurrentPlayer()} (${gameBoard.getCurrentMarker()})`;
        }
        
    };

    const update = (square, player) => {
        let gameEnd = false;
        if (square) {
            gameEnd = _checkWinner(square, player);
            gameBoard.setCurrentPlayer();
        }


        if (gameEnd) {
            _changeDisplay(player);
        } else {
            _changeDisplay();
        }
    }

    return {
        update,
    };
})();

let resetButton = document.getElementById('restart');
resetButton.addEventListener('click', () => gameBoard.resetGameBoard());

gameBoard.resetGameBoard();
