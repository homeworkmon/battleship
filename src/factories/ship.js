function makeShip(coordinates) {
    return {
        coordinates,
        hits: [],
        isHit(pos) {
            if (coordinates.includes(pos) && !this.hits.includes(pos)) {
                this.hits.push(pos);
                return true;
            } return false;
        },
        isSunk() {
            if (coordinates.every(coordinate => this.hits.includes(coordinate))) {
                return true;
            }
            return false;
        }
    }
}

export default makeShip;