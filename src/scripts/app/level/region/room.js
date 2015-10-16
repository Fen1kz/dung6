'use strict';

import Promise from 'bluebird';

import {Region} from 'app/level/region/region';
import {Random} from 'app/util/random';
import {Direction} from 'app/entities/level/directions';

class Room extends Region {
  constructor(level, X = 0, Y = 0, W, H) {
    super(level, X, Y);
    this.debugColor = 0xFF0000;
    this.debugInit(Phaser.Keyboard.R);

    this.cells = [];

    if (!W || !H) {
      this.generateSize();
    } else {
      this.setSize(W, H);
    }
  }

  getConfig() {
    return {
      width: {min: 3, max: 5}
      , height: {min: 3, max: 5}
      , area: {min: 9, max: 25}
    }
  }

  get MOVE() {
    return {
      XY: (X, Y) => {
        this.X += X;
        this.Y += Y;
        this.updateCoords();
      }
      , X: (X) => {
        this.X += X;
        this.updateCoords();
      }
      , Y: (Y) => {
        this.Y += Y;
        this.updateCoords();
      }
    }
  }

  generateSize() {
    let config = this.getConfig();
    let sizes = [];
    for (let sideWidth = config.width.min; sideWidth <= config.width.max; ++sideWidth) {
      for (let sideHeight = config.height.min; sideHeight <= config.height.max; ++sideHeight) {
        if (sideWidth * sideHeight >= config.area.min && sideWidth * sideHeight <= config.area.max) {
          sizes.push([sideWidth, sideHeight]);
        }
      }
    }
    let size = Random.sample(sizes);
    this.setSize(size[0], size[1]);
  }

  generate(center) {
    this.center = center;
    this.cells = [];
    this.addCell(this.center);
    this.center.state.color = 0xFF0000;
    this.center.draw();
    for (let side1 = this.size.side1.min; side1 < this.size.side1.max; ++side1) {
      for (let side2 = this.size.side2.min; side2 < this.size.side2.max; ++side2) {
        let cell = this.level.cells.get(this.center.X + side1, this.center.Y + side2);
        if (cell !== this.center) {
          cell.state.color = 0xFF9999;
          cell.draw();
          this.addCell(cell);
        }
      }
    }
  }

  addCell(cell) {
    cell.room = this;
    this.cells.push(cell);
  }

  static expandTo(array, d, count = 1) {
    return this.resizeTo(array, d, count, true);
  }

  static shrinkTo(array, d, count = 1) {
    return this.resizeTo(array, d, count, false);
  }

  static resizeTo(array, d, count = 1, expand) {
    let side;
    let result = _.clone(array);

    if (Array.isArray(d)) {
      return d.reduce((result, d) => {
        return Room.resizeTo(result, d, count, expand);
      }, result);
    }

    side = this.getSide(array, d);

    for (let i = 0; i < count; ++i) {
      let newSide = [];
      side.forEach((c) => {
        if (expand) {
          let child = c.cells.get(d);
          if (child) {
            newSide.push(child);
            result.push(child);
          }
        } else {
          _.remove(result, c);
          let child = c.cells.get(d.opposite());
          if (child) {
            newSide.push(child);
          }
        }
      });
      side = newSide;
    }
    return result;
  }

  static getSide(array, d) {
    let maxD, side;
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
    return side;
  }
}

export {Room};
