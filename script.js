const body = document.querySelector('body');
const board = document.getElementById('board');

let horizWin = getWinConditions(3, 3, 3); // includes major diag
let vertWin = []; // includes minor diag
horizWin.forEach(cond => {
    vertWin.push(rotate(cond));
})
let availableSelections = createArray(3, 3, 1);
let p1Data = createArray(3, 3, 0);
let p2Data = createArray(3, 3, 0);
let p1TurnBool = true; // indicates player turn

function makeGrid(dim) {
    for(let row = 0; row < dim; row++) {
        const container = document.createElement('div');

        for(let col = 0; col < dim; col++) {
            const square = document.createElement('button');
            square.classList.add('square');
            square.addEventListener('click', () => {
                if (validateChoice(row, col)) {
                    storeData(row, col);
                    markLocation(square);
                    const win = checkForWin(row, col);
                    console.log(win);
                    if (win) {
                        console.log(p1TurnBool);
                        if(p1TurnBool) {
                            console.log('test');
                            display('player 1 wins!');
                        }
                        else {
                            display('player two wins!');
                        }
                        reset();
                    }
                    else if (!availableSelections.flat().includes(1)) {
                        display('Tie!');
                        reset();
                    } else {display('')}
                    switchTurn();
                }
            })
            container.appendChild(square);
        }
        board.appendChild(container);
    }
}

function reset() {
    horizWin = getWinConditions(3, 3, 3); // includes major diag
    vertWin = []; // includes minor diag
    horizWin.forEach(cond => {
        vertWin.push(rotate(cond));
    })
    availableSelections = createArray(3, 3, 1);
    p1Data = createArray(3, 3, 0);
    p2Data = createArray(3, 3, 0);
    p1TurnBool = true; // indicates player turn
    const squares = [...document.querySelectorAll('.square')];
    squares.forEach(e => e.textContent = '');

}

const result = document.getElementById('result');
function display(str) {
    result.textContent = str;
}

function checkForWin(r, c) {
    let win = [1, 1, 1, 1];
    let data = p1TurnBool ? p1Data : p2Data;
    const potentialWins = [
        horizWin[r],
        vertWin[c],
        horizWin[horizWin.length-1],
        vertWin[vertWin.length-1]
    ]
    potentialWins.forEach((cond, index) => {

        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(cond[i][j] && !data[i][j]) {
                    win[index] = 0;
                }
            }
        }
    })
    if (win.includes(1)) {
        return true;
    }
    return false;
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
    }
    allWinConditions.push(identityMat);

    return allWinConditions;
}

function markLocation(docElement) {
    if (p1TurnBool) {
        docElement.textContent = 'X';
    } else {
        docElement.textContent = 'O';
    }
}

function rotate(arr) {
    return arr[0].map((val, index) => arr.map(row => row[row.length-1-index]));
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