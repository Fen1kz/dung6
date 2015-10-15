'use strict';

import Promise from 'bluebird';

import {Cell} from 'app/entities/level/cell';
import {Directions as Dir} from 'app/entities/level/directions';
import {CompositeMap2d} from 'app/util/composite-map-2d';

class Chunk extends Phaser.Group {
  constructor(level, X, Y) {
    super(level.game);
    this.level = level;
    //this.WIDTH = Math.floor(this.game.world.width / this.SIZE);
    //this.HEIGHT = Math.floor(this.game.world.height / this.SIZE);
    //this.WIDTH = 2;
    //this.HEIGHT = 2;
    this.X = X;
    this.Y = Y;
    this.WIDTH = 24;
    this.HEIGHT = 24;
    this.MINX = this.X * this.WIDTH  - Math.floor(this.WIDTH / 2);
    this.MINY = this.Y * this.HEIGHT - Math.floor(this.HEIGHT / 2);
    this.MAXX = this.X * this.WIDTH  + Math.ceil(this.WIDTH / 2) - 1;
    this.MAXY = this.Y * this.HEIGHT + Math.ceil(this.HEIGHT / 2) - 1;

    //this.anchor.setTo(0.5, 0.5);
    this.x = this.game.c.SIZE * (this.X * this.WIDTH - ((this.WIDTH / 2) + 0.5) % 1);
    this.y = this.game.c.SIZE * (this.Y * this.HEIGHT - ((this.HEIGHT / 2) + 0.5) % 1);
    console.log(this.x, this.y);


    //this.width = this.game.c.SIZE * this.WIDTH;
    //this.height = this.game.c.SIZE * this.HEIGHT;
    //
    //console.log(this.game.c.SIZE, this.WIDTH)
    //console.log(this.width, this.height)

//    this.graphics = this.game.add.graphics();
//    this.addChild(this.graphics);

    this.borders = [];
    this.cells = new CompositeMap2d();

    for (let X = this.MINX; X <= this.MAXX; ++X) {
      for (let Y = this.MINY; Y <= this.MAXY; ++Y) {
        let cell = new Cell(this, X, Y);
        this.cells.add(cell);
        this.level.cells.add(cell);
      }
    }

    let add = (cellCells, dir, another) => {
      if (another) {
        cellCells.put(dir, another);
      }
    };

    this.cells.forEach((cell) => {
      add(cell.cells, Dir.N, this.cells.get(cell.X, cell.Y - 1));
      add(cell.cells, Dir.E, this.cells.get(cell.X + 1, cell.Y));
      add(cell.cells, Dir.S, this.cells.get(cell.X, cell.Y + 1));
      add(cell.cells, Dir.W, this.cells.get(cell.X - 1, cell.Y));
    });

    this.setupDebug();
  }

  setupDebug () {
    let width = this.game.c.SIZE * this.WIDTH;
    let height = this.game.c.SIZE * this.HEIGHT;
    this.debugGfx = this.game.make.graphics(0, 0);
    this.debugGfx.lineStyle(5, 0x0000FF, .5);
    this.debugGfx.drawRect(width *-.5, height *-.5, width, height);
    this.debugGfx.endFill();
    //this.debugGfx.x -= this.x = this.game.c.SIZE * -.5;
    //this.debugGfx.y -= this.game.c.SIZE * -.5;

    this.add(this.debugGfx);

    this.game.input.keyboard.addKey(Phaser.Keyboard.C).onDown.add(() => {
      this.debugGfx.visible = !this.debugGfx.visible;
    });
  }

//  show() {
//    //this.draw();
//    let promise = [];
//    this.cells.forEach((cell) => {
//      promise.push(cell.show());
//    });
//    return Promise.all(promise);
//  }
//
//  setGenerator(generator) {
//    if (this.generator) this.generator.destroy();
//    this.generator = generator;
//    this.generator.game = this.game;
//    this.generator.level = this;
//    this.generator.activate();
//    //return this.generator.start();
//  }
//
//  update() {
//    //console.log('d');
//  }
}

export {Chunk};
