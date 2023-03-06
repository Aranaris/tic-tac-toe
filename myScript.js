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
            let newSquare = document.createElement('div');
            newSquare.className = 'game-square';
            newSquare.id = `${i}`;
            newSquare.textContent = i;
            newSquare.addEventListener('click',() => {
                makePlay(i);
            }, false);
            boardGrid.appendChild(newSquare);
            
        }
    };

    let currentPlayer = playerOne;
    let getCurrentPlayer = () => currentPlayer.getName;
    let getCurrentMarker = () => currentPlayer.marker;

    const setCurrentPlayer = () => {
        if (currentPlayer === playerOne) {
            currentPlayer = playerTwo;
            console.log(`${currentPlayer.getName}`);
        } else if (currentPlayer === playerTwo) {
            currentPlayer = playerOne;
            console.log(`${currentPlayer.getName}`);
        }
        getCurrentPlayer = currentPlayer.getName;
    };

    

    const makePlay = (square) => {
        let getSquare = document.getElementById(square);
        getSquare.textContent = currentPlayer.marker;
        setCurrentPlayer();
        gameController.update();
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
    const dummyVal = true;
    const _checkWinner = () => {
        if (dummyVal) {
            console.log('winner');
        }
    };

    const _changeDisplay = () => {
        let scoreBoard = document.querySelector('.game-info');
        scoreBoard.replaceChildren();
        scoreBoard.textContent = `${gameBoard.getCurrentPlayer()}: ${gameBoard.getCurrentMarker()}`;
    };

    const update = () => {
        _checkWinner();
        _changeDisplay();
    }

    return {
        update,
    };
})();


gameBoard.resetGameBoard();
gameController.update();