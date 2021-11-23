import shipEventHandler from './placementDom.js';
import { startHandler } from './gameDom.js';

const checkCount = (count) => {
    if (count === 5) {
        document.querySelector('.add-button').addEventListener('click', () => {
            document.querySelector('.placement-screen').style.display = "none";
            document.querySelector('.main').style.display = 'flex';
            startHandler();
        })
    }
}

const displayController = () => {
    const alignmentButton = document.querySelector(".alignment-button");
    alignmentButton.addEventListener('click', () => {
        alignmentButton.classList.toggle('vertical');
    })

    const placementGrid = document.querySelector('.placement-grid').childNodes;
    let count = 0;
    placementGrid.forEach(node => {
        node.addEventListener('mouseover', (e) => {
            shipEventHandler(e, count);
        });
    });
    placementGrid.forEach(node => {
        node.addEventListener('click', (e) => {
            count = shipEventHandler(e, count);
            checkCount(count, placementGrid);
        });
    })

    const close = document.querySelector('.close-modal');
    const modal = document.querySelector('.modal');
    close.addEventListener('click', () => {
        modal.style.display = 'none';
    })
    const playAgain = document.querySelector('.play-again');
    playAgain.addEventListener('click', () => {
        modal.style.display = 'none';
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    })    
}

export default displayController;