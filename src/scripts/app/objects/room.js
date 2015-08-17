'use strict';

import Promise from 'bluebird';
import {Random} from 'app/util/random';
import {Direction} from 'app/entities/level/directions';

class Room {
  constructor(center) {
    this.center = center;
    this.level = center.level;

    this.cells = [center];

    this.sq = Random.include(this.constructor.config.square.min, this.constructor.config.square.max);
  }

  static get config() {
    return {
      side: {min: 2, max: 6}
      , square: {min: 9, max: 25}
    }
  }

;

  generate() {
    this.center.state.color = 0xFF0000;
    this.center.draw();

    let config = this.constructor.config;
    let sizes = [];
    let side = config.side.min;
    for (let side1 = config.side.min; side1 <= config.side.max; ++side1) {
      for (let side2 = config.side.min; side2 <= config.side.max; ++side2) {
        if (side1 * side2 >= config.square.min && side1 * side2 <= config.square.max) {
          sizes.push({side1: {length: side1}, side2: {length: side2}});
        }
      }
    }

    let size = Random.sample(sizes);
    size.side1.min = -Math.floor(size.side1.length / 2);
    size.side1.max = Math.ceil(size.side1.length / 2);
    size.side2.min = -Math.floor(size.side2.length / 2);
    size.side2.max = Math.ceil(size.side2.length / 2);
    console.log(size);

    for (let side1 = size.side1.min; side1 < size.side1.max; ++side1) {
      for (let side2 = size.side2.min; side2 < size.side2.max; ++side2) {
        let cell = this.level.cells.get(this.center.X + side1, this.center.Y + side2);
        if (cell !== this.center) {
          cell.state.color = 0xFF9999;
          cell.draw();
        }
      }
    }


    //this.

    //this.expand(1);
    //this.expand(1);
    //
    //this.cells.forEach((cell) => {
    //   cell.state.color = 0xFF9999;
    //   cell.draw();
    //});
    //
    //this.center.state.color = 0xFF0000;
    //this.center.draw();


    //this.X = Random.include(this.chunk.MINX + this.side, this.chunk.MAXX - this.side);
    //this.Y = Random.include(this.chunk.MINY + this.side, this.chunk.MAXY - this.side);
    //let cell = this.chunk.cells.get(this.X, this.Y);
  }

  expand(count = 1) {
    for (let i = 0; i < count; ++i) {
      this.cells.forEach((cell) => {
        this.expandCell(cell);
      }, this);
      //console.log('---');
      //console.log(arr.length);
      this.cells = _.uniq(this.cells);
      //console.log(arr.length);
    }
    return this.cells;
  }

  expandCell(cell) {
    cell.cells.forEach((cell1, key) => {
      let d = Direction.fromString(key);
      let cell2 = cell1.cells.get(d.right());
      this.cells.push(cell1);
      if (cell2) {
        this.cells.push(cell2);
      }
    }, this);
    return this.cells;
  }
}

export {Room};
