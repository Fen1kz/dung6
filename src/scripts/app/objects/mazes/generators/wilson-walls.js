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
  }

  expand(cell, count = 1) {
    let arr = [cell];
    for (let i = 0; i < count; ++i) {
      arr.forEach((cell) => {
        this.expand1(cell, arr);
      });
      //console.log('---');
      //console.log(arr.length);
      arr = _.uniq(arr);
      //console.log(arr.length);
    }
    return arr;
  }

  expand1(cell, arr = [cell]) {
    cell.cells.forEach((cell1, key) => {
      let d = Direction.fromString(key);
      let cell2 = cell1.cells.get(d.right());
      arr.push(cell1);
      if (cell2) {
        arr.push(cell2);
      }
    });
    return arr;
  }

  start() {
    this.SPEED = 1;

    for (let i = 0; i < 5; ++i) {
      let x = _.random(this.level.MINX, this.level.MAXX);
      let y = _.random(this.level.MINY, this.level.MAXY);
      console.log(x, y);
      let roomCell = this.level.cells.get(x, y);
      let room = this.expand(roomCell, 1);

      room.forEach((cell) => {
        cell.setState('mark');
      });
    }

    //let topRoomCell = roomCell.cells.get(d.N).setState('placed');
    //let RightRoomCell = topRoomCell.cells.get(d.N.right())
    //  .setState('mark');


    //let topRoomCell = roomCell.cells.get(d.N);


    //super.start();
  }

  //makeCellPlaced(cell) {
  //  super.makeCellPlaced(cell)
  //  if (this.path.length == 1) {
  //    cell.state.color = 0xaaaaaa
  //  }
  //}

  //makeCellsPlaced() {
  //  this.cells.forEach(c => c.draw());
  //  debugger;
  //  //if (this.path.length == 1) {
  //  //  console.log(this.path);
  //  //  let cell = this.path[0];
  //  //  cell.setState('placed');
  //  //  cell.state.color = 0x333333;
  //  //  cell.draw();
  //  //  _.remove(this.cells, (c) => c === cell);
  //  //} else {
  //    super.makeCellsPlaced();
  //  //}
  //}
}

export {WilsonWalls};
