import makeShip from './ship.js';

function makeGameboard() {

    return {
        ships: [],
        shots: [],

        placeShip(coords) {
            const ship = makeShip(coords);
            this.ships.push(ship);
        },

        receiveAttack(coords) {
            for (let i=0;i<this.ships.length;i++) {
                if (this.ships[i].coordinates.includes(coords)) {
                    this.ships[i].isHit(coords);
                    this.shots.push({'shot': coords, hit: true});
                    return true;
                } 
            }
            if (!this.shots.some(shot => coords.includes(shot))) {
                this.shots.push({'shot': coords, hit: false});
            }
            return false;
        },

        checkAllSunk() {
            if (this.ships.length && this.ships.every((ship) => ship.isSunk())) {
                return true
            }
            return false
        }
    }
}

export default makeGameboard;