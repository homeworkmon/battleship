import makePlayer from "./factories/player.js";
// eslint-disable-next-line import/no-cycle
import { attackHandler, shotsOn, updateTotals, showModal } from "./dom/gameDom.js"

const human = makePlayer(false);
const ai = makePlayer(true);
ai.generateFleet();

// placement screen has to go first but later

/*
human.gameboard.placeShip(['a5', 'b5', 'c5', 'd5', 'e5']);
human.gameboard.placeShip(['f7', 'f8', 'f9', 'f10']);
human.gameboard.placeShip(['g2', 'h2', 'i2', 'j2']);
human.gameboard.placeShip(['a9', 'b9', 'c9']);
human.gameboard.placeShip(['b1', 'b2']);
*/

const playHuman = () => {  shotsOn(); }

let count = 0;

function gameLoop() {
    count +=1;
    if (human.gameboard.checkAllSunk() || ai.gameboard.checkAllSunk()) { 
        if (ai.gameboard.checkAllSunk() === true) {
            showModal(true)
        } else {
            showModal(false); 
        }
    } 
    updateTotals();
    playHuman();
}

let prevHit = false;
let prevCoord = '';
let adjCount = 0;

const playAi = () => {
    let pos;
    if (count === 1 ) {
        pos = ai.playRandom(human.gameboard);
    } else if (prevHit && adjCount < 3 && !ai.adjTaken(human.gameboard, prevCoord)) {
            adjCount += 1;
            pos = ai.playAdjacent(human.gameboard, prevCoord);
        } else { 
            pos = ai.playRandom(human.gameboard); 
        }
    setTimeout(() => attackHandler(pos, ai, human), 1500);
    setTimeout(() => gameLoop(), 1500);
    setTimeout(() => {
        const shot = human.gameboard.shots.find(i => i.shot === pos);
        if (shot.hit) {
            prevHit = shot.hit;
            prevCoord = shot.shot;
            adjCount = 0;
        } else if (adjCount === 0 && !shot.hit) {
                prevHit = shot.hit;
                prevCoord = shot.shot;
            }
    },  1501);
}

export { human, ai, playAi, gameLoop };