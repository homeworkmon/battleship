/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-cycle
import {human, ai, playAi, gameLoop } from '../game.js';

const render = (array, grid) => {
    const nodes = grid.childNodes;
    array.forEach(item => {
        const pos = [...nodes].filter(node => node.classList.contains(item))[0];
        pos.classList.add('selected');
        if (grid.classList.contains('player-grid')) {
            pos.style.backgroundColor =  'var(--grey-blue)';
        }
    })
}
// all purpose attackHandler for rendering board 
// receives ai gameboard from click event or human gameboard from ai method
function attackHandler(target, player, opponent) {
    let pos;
    let grid;
    // if it comes from click event get pos from classList
    if (!player.isAi) {
        pos = target.classList[1];
        grid = document.querySelector('.ai-grid').childNodes;
    }
    else if (player.isAi) {
        pos = target;
        grid = document.querySelector('.player-grid').childNodes;
    } 
    const hit = opponent.gameboard.receiveAttack(pos);
    const coord = [...grid].filter(square => square.classList.contains(pos))[0];
    coord.style.transform = 'scale(1.04)';
    if (hit) {
        coord.classList.add('hit');
    } else if (!hit) {
        coord.classList.add('miss');
    }
    setTimeout(() => { coord.style.transform = 'none' }, 500)
}

function isShot(e) {
    const aiGrid = document.querySelector('.ai-grid');
    const aiGridChild = document.querySelector('.ai-grid').childNodes;
    const removeClick = () => { aiGrid.removeEventListener('click', isShot) }
    const notShot = [...aiGridChild].filter(square => (!square.classList.contains('hit') && !square.classList.contains('miss')));
    if (notShot.includes(e.target)) {
        attackHandler(e.target, human, ai);
        removeClick();
        playAi();
    }
}
// add event listener to available squares once only thru delegation
const shotsOn = () => {
    const aiGrid = document.querySelector('.ai-grid');
    aiGrid.addEventListener('click', isShot);
}

const startHandler = () => {
    const humanCoords = human.gameboard.ships.flatMap(ship => ship.coordinates);
    const aiCoords = ai.gameboard.ships.flatMap(ship => ship.coordinates);

    const playerGrid = document.querySelector('.player-grid');
    const aiGrid = document.querySelector('.ai-grid');

    render(humanCoords, playerGrid);
    render(aiCoords, aiGrid);

    gameLoop();
}

const updateTotals = () => {
    const aiScore = document.querySelector('.ai-score');
    const humanScore = document.querySelector('.player-score');

    const humanTotal = human.gameboard.ships.filter(ship => ship.isSunk() === true);
    const aiTotal = ai.gameboard.ships.filter(ship => ship.isSunk() === true);

    aiScore.textContent = `Ships down: ${aiTotal.length}`;
    humanScore.textContent = `Ships down: ${humanTotal.length}`;
}

const showModal = (humanWon) => {
    const modal = document.querySelector('.modal');
    const textCard = document.querySelector('.text-card');
    modal.style.display = 'block';
    if (humanWon) {
        textCard.textContent = 'congrats you won!'
    } else { textCard.textContent = 'awh you lost :(' }
}

export { startHandler, attackHandler, shotsOn, updateTotals, showModal }; 