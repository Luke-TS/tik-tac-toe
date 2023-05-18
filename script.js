const board = document.getElementById('board');

let p1Data = createArray(3, 3, 0);
let p2Data = createArray(3, 3, 0);
let currentTurn = 'p1'; // indicates player turn

function makeGrid(dim) {
    for(let row = 0; row < dim; row++) {
        let container = document.createElement('div');

        for(let col = 0; col < dim; col++) {
            const square = document.createElement('button');
            square.addEventListener('click', () => {
                storeData(row, col, currentTurn);
                switchTurn();
            })
            container.appendChild(square);
        }
        board.appendChild(container);
    }
}

function storeData(r, c, turn) {
    switch(turn) {
        case 'p1':
            p1Data[r][c] = 1;
            break;
        case 'p2':
            p2Data[r][c] = 1;
            break;
        default:
            console.log('error');
            break;
    }
}

function switchTurn() {
    switch(currentTurn) {
        case 'p1':
            currentTurn = 'p2';
            break;
        case 'p2':
            currentTurn = 'p1';
            break;
        default:
            console.log('error');
    }
}

function createArray(rows, cols, fillVal) {
    return Array(rows).fill().map(() => Array(cols).fill(fillVal));
}

function startGame() {
    makeGrid(3);
}

startGame();