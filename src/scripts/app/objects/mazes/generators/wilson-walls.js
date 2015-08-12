'use strict';

import Promise from 'bluebird';
import _ from 'lodash';

import {Wilson} from 'app/objects/mazes/generators/wilson'
import {CellState} from 'app/entities/level/cell'
import {Border} from 'app/entities/level/border'
import {Directions as d} from 'app/entities/level/directions'

class WilsonWalls extends Wilson {
  constructor(options) {
    super(options);
  }

  expand(cell) {
    let arr = [];
    cell.cells.

    return arr;
  }

  start() {
    this.SPEED = 1;

    let x = _.random(this.level.MINX, this.level.MAXX);
    let y = _.random(this.level.MINY, this.level.MAXY);
    console.log(x, y);
    let roomCell = this.level.cells.get(x,y);
    let room = this.expand(roomCell);
    //roomCell.setState('mark');
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
