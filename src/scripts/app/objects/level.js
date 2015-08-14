'use strict';

import Promise from 'bluebird';

import {Chunk} from 'app/objects/chunk';
import {Cell} from 'app/entities/level/cell';
import {Directions as Dir} from 'app/entities/level/directions';
import {CompositeMap2d} from 'app/util/composite-map-2d';

class Level extends Phaser.Group {
  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);

    //this.WIDTH = Math.floor(this.game.world.width / this.SIZE);
    //this.HEIGHT = Math.floor(this.game.world.height / this.SIZE);
    //this.WIDTH = 2;
    //this.HEIGHT = 2;

    //this.WIDTH = 2;
    //this.HEIGHT = 2;
    //this.MINX = -Math.ceil(this.WIDTH / 2);
    //this.MINY = -Math.ceil(this.HEIGHT / 2);
    //this.MAXX = Math.floor(this.WIDTH / 2) - 1;
    //this.MAXY = Math.floor(this.HEIGHT / 2) - 1;

    //this.anchor.setTo(0.5, 0.5);
    this.x = this.game.world.width / 2;
    this.y = this.game.world.height / 2;

    this.graphics = this.game.add.graphics();
    this.addChild(this.graphics);

    this.borders = [];
    this.cells = new CompositeMap2d();
    this.chunks = new CompositeMap2d();
  }

  chunk(X, Y) {
    let chunk = new Chunk(this, X, Y);
    this.chunks.add(chunk);
    this.addChild(chunk);
    return chunk;
  }

  clear() {
    this.cells.forEach((cell) => {
      cell.borders.forEach((b) => {
        b.destroy()
      });
      cell.setState();
      cell.direction = void 0;
    });
  }

  show() {
    //this.draw();
    let promise = [];
    this.cells.forEach((cell) => {
      promise.push(cell.show());
    });
    return Promise.all(promise);
  }

  //setGenerator(generator) {
  //  if (this.generator) this.generator.destroy();
  //  this.generator = generator;
  //  this.generator.game = this.game;
  //  this.generator.level = this;
  //  this.generator.activate();
  //  //return this.generator.start();
  //}

  update() {
    //console.log('d');
  }
}

export {Level};
