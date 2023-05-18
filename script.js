const board = document.getElementById('board');

function makeGrid(dim) {
    for(let i = 0; i < dim; i++) {
        let container = document.createElement('div');
        container.classList.add = 'container';

        for(let j = 0; j < dim; j++) {
            const square = {
                btn: document.createElement('button'),
            };
            square.btn.classList.add = 'square';
            square.btn.addEventListener('mouseover', () => {

            });
            container.appendChild(square.btn);
        }
        board.appendChild(container);
    }
}

makeGrid(3);