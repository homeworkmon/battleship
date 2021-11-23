import makeGameboard from '../factories/gameboard';
import makeShip from '../factories/ship';

describe('gameboard', () => {
    let gameboard;
    beforeAll(() => {
        gameboard = makeGameboard();
        gameboard.placeShip(['a1', 'a2', 'a3', 'a4', 'a5']);
        gameboard.placeShip(['d2']);
    })

    test('gameboard to create and store ships w coords', () => {
        const sampleShips = [ 
            makeShip(['a1', 'a2', 'a3', 'a4', 'a5']),
            makeShip(['d2'])
        ];
        expect(gameboard.ships[0].coordinates).toEqual(sampleShips[0].coordinates);
        expect(gameboard.ships[1].coordinates).toEqual(sampleShips[1].coordinates);
    })

    test('gameboard determines if attack is hit or miss and stores shots', () => {
        gameboard.receiveAttack('a5');
        expect(gameboard.shots[0].hit).toEqual(true);
        expect(gameboard.shots[0].shot).toEqual('a5');
        gameboard.receiveAttack('b7');
        expect(gameboard.shots[1].hit).toEqual(false);
    })

    test('gameboard reports if all ships are sunk correctly', () => {
        expect(gameboard.checkAllSunk()).toEqual(false);
        gameboard.ships.forEach((ship) => ship.coordinates.forEach((coord) => ship.isHit(coord)));
        expect(gameboard.checkAllSunk()).toEqual(true);
    })


})