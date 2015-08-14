'use strict';

import Promise from 'bluebird';
import {Random} from 'app/util/random';

class Room {
  constructor(center) {
    this.center = center;

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


    //this.X = Random.include(this.chunk.MINX + this.side, this.chunk.MAXX - this.side);
    //this.Y = Random.include(this.chunk.MINY + this.side, this.chunk.MAXY - this.side);
    //let cell = this.chunk.cells.get(this.X, this.Y);
  }

  //expand(cell, count = 1) {
  //  let arr = [cell];
  //  for (let i = 0; i < count; ++i) {
  //    arr.forEach((cell) => {
  //      this.expand1(cell, arr);
  //    });
  //    //console.log('---');
  //    //console.log(arr.length);
  //    arr = _.uniq(arr);
  //    //console.log(arr.length);
  //  }
  //  return arr;
  //}
  //
  //expand1(cell, arr = [cell]) {
  //  cell.cells.forEach((cell1, key) => {
  //    let d = Direction.fromString(key);
  //    let cell2 = cell1.cells.get(d.right());
  //    arr.push(cell1);
  //    if (cell2) {
  //      arr.push(cell2);
  //    }
  //  });
  //  return arr;
  //}
}

export {Room};
