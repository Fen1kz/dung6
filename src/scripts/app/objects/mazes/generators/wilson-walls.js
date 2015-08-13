'use strict';

import Promise from 'bluebird';
import _ from 'lodash';

import {Wilson} from 'app/objects/mazes/generators/wilson'
import {CellState} from 'app/entities/level/cell'
import {Border} from 'app/entities/level/border'
import {Directions as d, Direction} from 'app/entities/level/directions'

class WilsonWalls extends Wilson {
  constructor(options) {
    super(options);
    this.firstFn = (cells) => {
      return _.sample(cells);
    }
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

  start() {
    this.SPEED = 0;
    super.start();

    //for (let i = 0; i < 5; ++i) {
    //  let x = _.random(this.level.MINX, this.level.MAXX);
    //  let y = _.random(this.level.MINY, this.level.MAXY);
    //  console.log(x, y);
    //  let roomCell = this.level.cells.get(x, y);
    //  let room = this.expand(roomCell, 1);
    //
    //  room.forEach((cell) => {
    //    cell.setState('mark');
    //  });
    //}

    //let topRoomCell = roomCell.cells.get(d.N).setState('placed');
    //let RightRoomCell = topRoomCell.cells.get(d.N.right())
    //  .setState('mark');


    //let topRoomCell = roomCell.cells.get(d.N);


    //super.start();
  }

  makeCellPlaced(cell) {
    super.makeCellPlaced(cell);
    if (this.path.length == 1) {
      cell.state.color = 0x0
    }
  }

  makeCellsPlaced() {
    let cell;
    if (this.path.length == 1) {
      cell = this.path[0];
    }
    super.makeCellsPlaced();
    if (cell) {
      cell.state.color = 0x0;
      cell.draw();
    }
  }
}

export {WilsonWalls};
