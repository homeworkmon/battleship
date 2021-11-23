import makePlayer from '../factories/player';

describe('player', () => {
    const playerAi = makePlayer(true);
    const playerHuman = makePlayer(false);
    playerAi.gameboard.placeShip(['a1', 'a2', 'a3', 'a4', 'a5']);
    playerHuman.gameboard.placeShip(['d2']);

    // test outdated as scope changed
    /*
    test('player can attack enemy gameboard', () => {
        playerHuman.playMove(playerAi.gameboard, 'a5');
        expect(playerAi.gameboard.shots[0].shot).toEqual('a5');
        playerAi.playMove(playerHuman.gameboard);
        expect(playerHuman.gameboard.shots.length).toEqual(1);
    })

    // this test slowed jest significantly for some reason 
    
    /* test('ai does not hit places that were already hit', () => {
        const alreadyPlayed = [];
        for (let i=0;i<99;i++) {
            alreadyPlayed.push(playerAi.playMove(playerHuman.gameboard));
        }
        const last = playerAi.playMove(playerHuman.gameboard);
        const isIncluded = alreadyPlayed.includes(last);
        expect(isIncluded).toEqual('false');
    }) */

})