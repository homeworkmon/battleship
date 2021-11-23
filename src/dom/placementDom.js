/* eslint-disable no-param-reassign */
import { human } from '../game.js';

const fleetHover = (e, shipLength) => {
    const {target} = e;
    const parent = target.parentElement;
    const nodes = parent.childNodes;
    const index = [...nodes].indexOf(target);
    const alignment = document.querySelector('.alignment-button').classList;

    const checkRowEnd = (rowParsed) => {
        let rowEnd;
        if (rowParsed.length === 1) {
            rowEnd = 9;
        }
        else {
            // eslint-disable-next-line prefer-destructuring
            rowEnd = `${rowParsed[0]}9`;
            rowEnd = parseInt(rowEnd, 10);
        }
        return rowEnd;
    }

    if (!alignment.contains('vertical')) {
        const rowParsed = index.toString().split('');
        const rowEnd = checkRowEnd(rowParsed);
        let j = 0;
        if (rowEnd - index >= shipLength-1) {
            const indexList = [index];
            for (let i=1;i<shipLength;i++) {
                j += 1;
                indexList.push(index+j);
            }
            const indexNodes = indexList.map(node => nodes[node]);
            const taken = indexNodes.some(node => node.classList.contains('selected'));
            if (!taken) {
                indexNodes.forEach(node => node.style.backgroundColor = ('var(--med-blue)'));
                target.addEventListener('mouseout', () => {
                    indexNodes.forEach(node => node.style.backgroundColor = 'white');
                })
            }
        } 
    }
    else if(alignment.contains('vertical')) {
        if (index - (10 * (shipLength-1)) >= 0) {
            const indexList = [index];
            let j = 1;
            for (let i=1;i<shipLength;i++) {
                indexList.push(index-j*10);
                j += 1;
            }
            const indexNodes = indexList.map(node => nodes[node]);
            const taken = indexNodes.some(node => node.classList.contains('selected'));
            if (!taken) {
                indexNodes.forEach(node => node.style.backgroundColor = ('var(--med-blue)'));
                target.addEventListener('mouseout', () => {
                    indexNodes.forEach(node => node.style.backgroundColor = 'white');
                })
            }
        }
    }
} 

const fleetPlacer = () => {
    const nodes = document.querySelector('.placement-grid').childNodes;
    const selected = [...nodes].filter(node => node.style.backgroundColor === 'var(--med-blue)');
    for (let i=0;i<selected.length;i++) {
        const id = selected[i].classList[1];
        const div = document.createElement('div');
        div.classList.add('square');
        div.classList.add(id);
        div.classList.add('selected');
        div.style.backgroundColor = 'var(--grey-blue)';
        selected[i].replaceWith(div);
    }
    const ship = selected.map(node => node.classList[1]);
    human.gameboard.placeShip(ship);
}

const shipEventHandler = (e, count) => {
    const fleet = [5, 4, 4, 3, 2];
    const num = fleet[count];
    if (e.type === 'mouseover') {
        fleetHover(e, num);
    } else if (e.type === 'click') {
        if (e.target.style.backgroundColor === 'var(--med-blue)') {
            fleetPlacer();
            return count += 1;
        }
    }    
    return count;
}

export default shipEventHandler;