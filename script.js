const board = document.getElementById('board');

let availableSelections = createArray(3, 3, 1);
let p1Data = createArray(3, 3, 0);
let p2Data = createArray(3, 3, 0);
let p1TurnBool = true; // indicates player turn

function makeGrid(dim) {
    for(let row = 0; row < dim; row++) {
        const container = document.createElement('div');

        for(let col = 0; col < dim; col++) {
            const square = document.createElement('button');
            square.addEventListener('click', () => {
                const valid = validateChoice(row, col);
                if (valid) {
                    storeData(row, col);
                    switchTurn();
                    displayData();
                }
            })
            container.appendChild(square);
        }
        board.appendChild(container);
    }
}

function validateChoice(r, c) {
    if (p1TurnBool) {
        return p1Data[r][c] != availableSelections[r][c];
    } else {
        return p2Data[r][c] != availableSelections[r][c];
    }
}

function storeData(r, c) {
    if (p1TurnBool) {
        p1Data[r][c] = 1;
    } else {
        p2Data[r][c] = 1;
    }
    availableSelections[r][c] = 0;
}

function switchTurn() {
    p1TurnBool = !p1TurnBool;
}

function createArray(rows, cols, fillVal) {
    return Array(rows).fill().map(() => Array(cols).fill(fillVal));
}

function startGame() {
    makeGrid(3);
}

function displayData() {
    console.table(p1Data);
    console.table(p2Data);
    console.table(availableSelections);
}

startGame();