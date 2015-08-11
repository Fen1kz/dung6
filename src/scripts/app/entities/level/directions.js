class Direction {
    constructor(str, num, arrow) {
        this.str = str;
        this.num = num;
        this.arrow = arrow;
    }

    opposite() {
        return this.constructor.fromNumber((this.num << 2) % 15);
    }

    toString() {
        return `${this.str}:${this.arrow}`;
    }
}

var Directions = {
    N: new Direction('N', (1 << 0), '↑')
    , E: new Direction('E', (1 << 1), '→')
    , S: new Direction('S', (1 << 2), '↓')
    , W: new Direction('W', (1 << 3), '←')
};

Direction.fromNumber = function (num) {
    return _.find(Directions, (d) => num === d.num);
};

Direction.fromString = function (str) {
    return _.find(Directions, (d) => str === d.toString());
};


export {Direction, Directions};
