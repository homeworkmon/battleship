import makeGameboard from './gameboard.js';
import { playRandom, playAdjacent, adjTaken } from '../ailogic/aiTurn.js';
import createShipMethodObj from '../ailogic/generateFleet.js';

// add all AI methods to object
const aiMethods = createShipMethodObj();
aiMethods.playRandom = playRandom;
aiMethods.playAdjacent = playAdjacent;
aiMethods.adjTaken = adjTaken;

const makePlayer = (isAi) => {

    const player = {};
    player.isAi = isAi;
    player.gameboard = makeGameboard();
    
    // use mixin for ai obj
    if (isAi) { Object.assign(player, aiMethods) }

    return player;
}

export default makePlayer;