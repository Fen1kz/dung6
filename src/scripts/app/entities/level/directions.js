class Direction {
    constructor(str, num, arrow) {
        this.str = str;
        this.num = num;
        this.arrow = arrow;
    }

    opposite() {
        return this.constructor.fromNumber((this.num << 2) % 15);
    }

    right() {
        return this.constructor.fromNumber((this.num << 1) % 15);
    }

    toString() {
        return this.str;
    }
}

var Directions = {
      N: new Direction('N', (1 << 0), '↑')
    , E: new Direction('E', (1 << 1), '→')
    , S: new Direction('S', (1 << 2), '↓')
    , W: new Direction('W', (1 << 3), '←')
};

var DirectionsNumber = {
    [1 << 0]: Directions.N
  , [1 << 1]: Directions.E
  , [1 << 2]: Directions.S
  , [1 << 3]: Directions.W
};

Direction.fromNumber = function (num) {
    return DirectionsNumber[num];
};

Direction.fromString = function (str) {
    return Directions[str];
};


export {Direction, Directions, DirectionsNumber};
