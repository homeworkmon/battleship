import makePlayer from "../factories/player.js";
import generateAdjacent from '../ailogic/aiTurn.js';

describe('ai ship generator', () => {
    
    test('ai ships dont overlap - expect no duplicates in gameboard.ships.coordinates', () => {
        const testPlayer = makePlayer(true);

        testPlayer.generateFleet();

        const all = [];
        testPlayer.gameboard.ships.forEach(ship => {
            ship.coordinates.forEach(coordinate => {
                all.push(coordinate);
            })
        })

        const testSet = new Set;
        all.forEach(item => testSet.add(item));

        expect(testSet.size).toEqual(all.length);
    })

    test('when a hit is detected AI picks adjacent squares', () => {

        const generate = (coord) => {
            const testSet = new Set;
            for (let i=0;i<30;i++) {
                testSet.add(generateAdjacent(coord));
            }
            return [...testSet];
        }

        const north = generate('b1');
        expect(north.sort()).toEqual(['a1', 'b2', 'c1'].sort());

        const south = generate('e10');
        expect(south.sort()).toEqual(['d10', 'e9', 'f10'].sort());

        const east = generate('j5');
        expect(east.sort()).toEqual(['j4', 'i5', 'j6'].sort());

        const west = generate('a5');
        expect(west.sort()).toEqual(['a4','b5','a6'].sort())

        const middle = generate('d4');
        expect(middle.sort()).toEqual(['d3', 'd5', 'c4', 'e4'].sort());

        const corner = generate('a1');
        expect(corner).toEqual([null]);
    })

})