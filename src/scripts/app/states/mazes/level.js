'use strict';

import {Cell} from 'app/entities/level/cell';
import {Directions as Dir} from 'app/entities/level/directions';
import {CompositeMap} from 'app/util/composite-map';

class Level extends Phaser.Sprite {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this.anchor.setTo(0.5, 0.5);
        this.SIZE = 40;
        this.WIDTH = Math.floor(this.game.width / this.SIZE);
        this.HEIGHT = Math.floor(this.game.height / this.SIZE);

        this.cells = new CellList();
        for (let X = -Math.floor(this.WIDTH * .5); X < Math.ceil(this.WIDTH * .5); ++X) {
            for (let Y = -Math.floor(this.HEIGHT * .5); Y < Math.ceil(this.HEIGHT * .5); ++Y) {
                this.cells.add(new Cell(this, X, Y));
            }
        }

        let add = (cellCells, dir, another) => {
            if (another) {
                cellCells.add(dir, another);
            }
        };

        this.cells.forEach((cell) => {
            add(cell.cells, Dir.N, this.cells.get(cell.X, cell.Y - 1));
            add(cell.cells, Dir.E, this.cells.get(cell.X + 1, cell.Y));
            add(cell.cells, Dir.S, this.cells.get(cell.X, cell.Y + 1));
            add(cell.cells, Dir.W, this.cells.get(cell.X - 1, cell.Y));
        });

        console.log(this.cells);
    }

    update() {
        //console.log('d');
    }

    render() {
        console.log('sasdr');
    }
}

class CellList extends CompositeMap {
    key(X, Y) {
        return X + ":" + Y;
    }

    add(cell) {
        this[this.key(cell.X, cell.Y)] = cell;
        return super.put(this.key(cell.X, cell.Y), cell);
    }

    get(X, Y) {
        return super.get(this.key(X, Y));
    }
}

export {Level, CellList};
