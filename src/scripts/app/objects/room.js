'use strict';

import Promise from 'bluebird';
import {Random} from 'app/util/random';
import {Direction} from 'app/entities/level/directions';

class Room {
  constructor(center) {
    this.center = center;

    this.cells = [center];

    this.sq = Random.include(this.constructor.config.square.min, this.constructor.config.square.max);
  }

  static get config() {
    return {
      side: 3
      , square: {min: 9, max: 25}
    }
  };

  generate() {
    this.center.state.color = 0xFF0000;
    this.center.draw();

    let side = this.square



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
