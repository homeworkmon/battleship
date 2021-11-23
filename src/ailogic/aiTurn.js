const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
const numbers = [...Array(11).keys()]
numbers.shift();

const generateRandom = () => letters[Math.floor(Math.random()*letters.length)] + numbers[Math.floor(Math.random()*numbers.length)].toString();

const generateAdjacent = (coord) =>  {
    const coords = coord.split('');
    const x = coords[0];
    const y = parseInt((coords.slice(1, coords.length)).join(''), 10);

    const vert = (a, b) => {
        const ran = Math.random();
        if (ran<0.5) {
            return `${a}${b+1}`
        } 
        return `${a}${b-1}`
    }
    
    const horz = (a, b) => {
        const ran = Math.random();
        if (ran<0.5) {
        return `${letters[letters.indexOf(a)+1]}${b}`
        } 
        return `${letters[letters.indexOf(a)-1]}${b}`
    }

    let result;

    // all directions within scope
    if (letters.indexOf(x)>=1 && letters.indexOf(x)<=8 && y>=2 && y<=9) {
        // choose vertical or horz
        if (Math.random()<0.5) {
            result = vert(x,y)
        } else { result = horz(x,y) }
    }
    // corner 
    else if (letters.indexOf(x)===0 && y===1 ||
        letters.indexOf(x)===0 && y===10 ||
        letters.indexOf(x)===9 && y===1 ||
        letters.indexOf(x)===9 && y===10) {
            result = null;
        }
    // out of bounds beginning
    else if (letters.indexOf(x)===0) {
        if (Math.random()<0.5) {
            result = vert(x,y)
        } else { result = `${letters[letters.indexOf(x)+1]}${y}`}
    }
    else if (y===1){
        if (Math.random()<0.5) {
            result = horz(x,y)
        } else { result =`${x}${y+1}` }
    }
    // out of bounds end
    else if (letters.indexOf(x)===9){
        if (Math.random()<0.5) {
            result = vert(x, y)
        } else {result =`${letters[letters.indexOf(x)-1]}${y}`}
    }
    else if (y===10) {
        if (Math.random()<0.5) {
            result = horz(x, y)
        } else {result = `${x}${y-1}`}
    }
    return result;
}

const adjTaken = (oppGameboard, move) => {
    const coords = move.split('');
    const a = coords[0];
    const b = parseInt((coords.slice(1, coords.length)).join(''), 10);
    // all directions within scope not needed bc playAdjacent only done up to 3 times
    let directions = [];
    if (letters.indexOf(a)>=1 && letters.indexOf(a)<=8 && b>=2 && b<=9) {
        directions = [`${a}${b+1}`, `${a}${b-1}`, `${letters[letters.indexOf(a)+1]}${b}`, `${letters[letters.indexOf(a)-1]}${b}`]
    }
    // out of bounds beginning
    if (letters.indexOf(a)===0) { directions = [`${letters[letters.indexOf(a)+1]}${b}`, `${a}${b+1}`, `${a}${b-1}`]; }
    else if (b===1){ directions = [`${a}${b+1}`, `${letters[letters.indexOf(a)+1]}${b}`, `${letters[letters.indexOf(a)-1]}${b}`]; }
    // out of bounds end
    else if (letters.indexOf(a)===9){ directions = [`${letters[letters.indexOf(a)-1]}${b}`, `${a}${b+1}`, `${a}${b-1}`]; }
    else if (b===10) { directions = [`${a}${b-1}`, `${letters[letters.indexOf(a)+1]}${b}`, `${letters[letters.indexOf(a)-1]}${b}`] }
    const shots = oppGameboard.shots.map(i => i.shot);
    if (directions.every(direction => shots.includes(direction))) {
        return true;
    }
    return false;
}

const isNotValid = (oppGameboard, move) => {
    for (let i=0;i<oppGameboard.shots.length;i++){
        if (oppGameboard.shots[i].shot === move) {
            return true;
        }
    }
    return false;
}

const playRandom = (oppGameboard) => {
    let pick = generateRandom();
    do { pick = generateRandom(); }
        while (isNotValid(oppGameboard, pick));
    return pick;
}

const playAdjacent = (oppGameboard, hit) => {
    let pick = generateAdjacent(hit);
    do { pick = generateAdjacent(hit); }
        while (isNotValid(oppGameboard, pick));
    return pick;
}

export { playRandom, playAdjacent, adjTaken, generateAdjacent }