'use strict';

import Promise from 'bluebird';
import {Random} from 'app/util/random';
import {Direction} from 'app/entities/level/directions';

class Room {
  constructor(level) {
    //this.center = center;
    this.level = level;

    this.cells = [];

    this.generateSize();
  }

  static get config() {
    return {
      //side: {min: 3, max: 6}
      //, square: {min: 9, max: 25}
      side: {min: 3, max: 8}
      //, square: {min: 9, max: 25}
    }
  }

  generateSize() {
    let config = this.constructor.config;
    let sizes = [];
    let side = config.side.min;
    for (let side1 = config.side.min; side1 <= config.side.max; ++side1) {
      for (let side2 = config.side.min; side2 <= config.side.max; ++side2) {
        if (!config.square || side1 * side2 >= config.square.min && side1 * side2 <= config.square.max) {
          sizes.push({side1: {length: side1}, side2: {length: side2}});
        }
      }
    }
    this.size = Random.sample(sizes);
    this.size.side1.min = -Math.floor(this.size.side1.length / 2);
    this.size.side1.max = Math.ceil(this.size.side1.length / 2);
    this.size.side2.min = -Math.floor(this.size.side2.length / 2);
    this.size.side2.max = Math.ceil(this.size.side2.length / 2);
  }

  generate(center) {
    this.center = center;
    this.cells = [this.center];
    this.center.state.color = 0xFF0000;
    this.center.draw();
    for (let side1 = this.size.side1.min; side1 < this.size.side1.max; ++side1) {
      for (let side2 = this.size.side2.min; side2 < this.size.side2.max; ++side2) {
        let cell = this.level.cells.get(this.center.X + side1, this.center.Y + side2);
        if (cell !== this.center) {
          cell.state.color = 0xFF9999;
          cell.draw();
          this.cells.push(cell);
        }
      }
    }
  }

  static expandTo(array, d, count = 1) {
    let maxD
      , side
      , result = _.clone(array);

    if (Array.isArray(d)) {
      return d.reduce((result, d) => {
        return Room.expandTo(result, d, count);
      }, result);
    }

    switch (d.str) {
      case 'N':
        maxD = _.min(array, (c) => c.Y);
        side = _.filter(array, (c) => c.Y === maxD.Y);
        break;
      case 'E':
        maxD = _.max(array, (c) => c.X);
        side = _.filter(array, (c) => c.X === maxD.X);
        break;
      case 'S':
        maxD = _.max(array, (c) => c.Y);
        side = _.filter(array, (c) => c.Y === maxD.Y);
        break;
      case 'W':
        maxD = _.min(array, (c) => c.X);
        side = _.filter(array, (c) => c.X === maxD.X);
        break;
    }

    for (let i = 0; i < count; ++i) {
      let newSide = [];
      side.forEach((c) => {
        let child = c.cells.get(d);
        if (child) {
          newSide.push(child);
          result.push(child);
        }
      });
      side = newSide;
    }
    return result;
  }

  static shrinkTo(array, d, count = 1) {
    let maxD
      , side
      , result = _.clone(array);

    if (Array.isArray(d)) {
      return d.reduce((result, d) => {
        return Room.shrinkTo(result, d, count);
      }, result);
    }

    switch (d.str) {
      case 'N':
        maxD = _.min(array, (c) => c.Y);
        side = _.filter(array, (c) => c.Y === maxD.Y);
        break;
      case 'E':
        maxD = _.max(array, (c) => c.X);
        side = _.filter(array, (c) => c.X === maxD.X);
        break;
      case 'S':
        maxD = _.max(array, (c) => c.Y);
        side = _.filter(array, (c) => c.Y === maxD.Y);
        break;
      case 'W':
        maxD = _.min(array, (c) => c.X);
        side = _.filter(array, (c) => c.X === maxD.X);
        break;
    }

    for (let i = 0; i < count; ++i) {
      let newSide = [];
      side.forEach((c) => {
        _.remove(result, c);
        let child = c.cells.get(d.opposite());
        if (child) {
          newSide.push(child);
        }
      });
      side = newSide;
    }
    return result;
  }
}

export {Room};
