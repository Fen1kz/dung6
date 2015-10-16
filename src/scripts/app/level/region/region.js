'use strict';

import Promise from 'bluebird';

import {Cell} from 'app/level/tile/cell';
import {Directions as Dir} from 'app/entities/level/directions';
import {CompositeMap2d} from 'app/util/composite-map-2d';

class Region extends Phaser.Group {
  constructor(level, X = 0, Y = 0) {
    super(level.game);
    this.level = level;
    this.X = X;
    this.Y = Y;
    this.WIDTH = 0;
    this.HEIGHT = 0;
  }

  getBBOX() {
    return {
      X: {
        MIN: this.X * this.WIDTH - Math.floor(this.WIDTH / 2)
        , MAX: this.X * this.WIDTH + Math.ceil(this.WIDTH / 2) - 1
      }, Y: {
        MIN: this.Y * this.HEIGHT - Math.floor(this.HEIGHT / 2)
        , MAX: this.Y * this.HEIGHT + Math.ceil(this.HEIGHT / 2) - 1
      }
    }
  }

  setSize(w, h) {
    this.WIDTH = w;
    this.HEIGHT = h;
    this.updateCoords();
  }

  updateCoords() {
    this.x = this.game.c.SIZE * (this.X - ((this.WIDTH / 2) + 0.5) % 1);
    this.y = this.game.c.SIZE * (this.Y - ((this.HEIGHT / 2) + 0.5) % 1);
    this.debugDraw();
  }

  debugDraw() {
    let width = this.game.c.SIZE * this.WIDTH;
    let height = this.game.c.SIZE * this.HEIGHT;
    this.debugGfx.clear();
    this.debugGfx.lineStyle(2, this.debugColor, .5);
    this.debugGfx.beginFill(this.debugColor, .1);
    this.debugGfx.drawRect(width * -.5, height * -.5, width, height);
    this.debugGfx.endFill();
  }

  debugInit(debugKey) {
    this.game.input.keyboard.addKey(debugKey).onDown.add(() => {
      this.debugGfx.visible = !this.debugGfx.visible;
    });
    this.debugGfx = this.game.make.graphics(0, 0);
    this.add(this.debugGfx);
    this.debugDraw();
  }
}

export {Region};
