'use strict';

import Promise from 'bluebird';

import {Region} from 'app/level/region/region';
import {Cell} from 'app/level/tile/cell';
import {Directions as Dir} from 'app/entities/level/directions';
import {CompositeMap2d} from 'app/util/composite-map-2d';

class Chunk extends Region {
  constructor(...args) {
    super(...args);
    this.debugColor = 0x0000FF;
    this.debugInit(Phaser.Keyboard.C);
    this.setSize(24, 24);

    this.cells = new CompositeMap2d();

    let BBOX = this.getBBOX();
    for (let X = BBOX.X.MIN; X <= BBOX.X.MAX; ++X) {
      for (let Y = BBOX.Y.MIN; Y <= BBOX.Y.MAX; ++Y) {
        let cell = new Cell(this, X, Y);
        this.cells.add(cell);
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
  }

  setSize(WIDTH, HEIGHT) {
    super.setSize(WIDTH, HEIGHT);
    this.x = this.game.c.SIZE * (this.X * this.WIDTH - ((this.WIDTH / 2) + 0.5) % 1);
    this.y = this.game.c.SIZE * (this.Y * this.HEIGHT - ((this.HEIGHT / 2) + 0.5) % 1);
    this.debugDraw();
  }
}

export {Chunk};
