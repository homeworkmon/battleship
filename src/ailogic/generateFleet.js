// export ship methods on object to preseve 'this' reference
const createShipMethodObj = () => {
    const obj = {

        generateShip(shipLength) {
            const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
            const numbers = [...Array(11).keys()];
            numbers.shift();

            const getAllExistingShips= () => {
                const all = [];
                this.gameboard.ships.forEach(ship => {
                    ship.coordinates.forEach(coordinate => {
                        all.push(coordinate);
                    })
                })
                return all;
            }

            const generateCoordinates = (vertical) => {
                const randomiser = (list) => list[Math.floor(Math.random()*list.length)]

                let x; let y;
                if (vertical) {
                    y = randomiser(numbers.slice(0, (10-shipLength)));
                    x = randomiser(letters);
                }
                else if (!vertical) {
                    x = randomiser(letters.slice(0, (10-shipLength)));
                    y = randomiser(numbers);
                }
                return [x, y];
            }
            
            const spawnShip = (vertical) => {
                const ship = [];
                const first = generateCoordinates(vertical);

                const x = first[0];
                const y = first[1];

                if(vertical) {
                    for(let i=0;i<shipLength;i++) {
                        ship.push(`${x}${y+i}`);
                    }
                }
                else if (!vertical) {
                    for (let i=0;i<shipLength;i++) {
                        const orig = letters.indexOf(x);
                        ship.push(`${letters[orig+i]}${y}`)
                    }
                }
                return ship;
            }

            const shipCaller = () => {
                const existing = getAllExistingShips();
                const vertical = Math.random() < 0.5;
                let sampleShip = spawnShip(vertical);

                while(sampleShip.some(i=> existing.includes(i))) {
                    sampleShip = spawnShip(vertical);
                }
                return sampleShip;

            }
        
            return shipCaller();
        },

        generateFleet() {
            const fleet = [5, 4, 4, 3, 2];

            fleet.forEach(i => {
                const x = this.generateShip(i);
                this.gameboard.placeShip(x);
            });
        }
    }

    return obj;
}

export default createShipMethodObj;