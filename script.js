const board = document.getElementById('board');

let winConditions = getWinConditions(3, 3, 3);
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

function getWinConditions(rows, columns, len) {
    let allWinConditions = [];

    // identity matrix serves as major diagonal win condition
    let identityMat = createArray(len, len, 0); 

    for(let i = 0; i < len; i++) {
        let horizCond = createArray(len, len, 0);
        for(let j = 0; j < len; j++) {
            horizCond[i][j] = 1;
            if (i == j) {identityMat[i][j] = 1;};
        }
        allWinConditions.push(horizCond);
        allWinConditions.push(transposeArr(horizCond));
    }
    allWinConditions.push(identityMat);
    allWinConditions.push(rotate(identityMat));

    return allWinConditions;
}

function rotate(arr) {
    return arr[0].map((_, index) => arr.map(row => row[index]).reverse())
}

function transposeArr(arr) {
    return arr[0].map((_, col) => arr.map(row => row[col]));
}

function validateChoice(r, c) {
    return availableSelections[r][c];
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