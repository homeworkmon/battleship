import makeShip from '../factories/ship';

// create testing component using 'describe'
describe('Ship', ()=> {
    let testShip;
    beforeAll(() => {
        testShip = makeShip(['a1', 'a2', 'a3', 'a4', 'a5']);
    })

    test('creates and initializes ship', () => {
        expect(testShip).toMatchObject({coordinates: ['a1', 'a2', 'a3', 'a4', 'a5'], hits: []})
    });

    test('takes a hit', () => {
        expect(testShip.isHit('a4')).toBeTruthy();
        expect(testShip.hits).toContain('a4');
    });

    test('is sunk', () => {
        testShip.coordinates.forEach(coordinate => testShip.isHit(coordinate));
        expect(testShip.isSunk()).toBeTruthy();
    }); 

})