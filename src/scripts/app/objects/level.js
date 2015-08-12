'use strict';

import Promise from 'bluebird';

import {Cell} from 'app/entities/level/cell';
import {Directions as Dir} from 'app/entities/level/directions';
import {CompositeMap} from 'app/util/composite-map';

class Level extends Phaser.Sprite {
    constructor(game, x, y, key, frame) {
        super(game, x, y, key, frame);

        this.SIZE = 40;
        //this.WIDTH = Math.floor(this.game.world.width / this.SIZE);
        //this.HEIGHT = Math.floor(this.game.world.height / this.SIZE);
        //this.WIDTH = 2;
        //this.HEIGHT = 2;
        this.WIDTH = 16;
        this.HEIGHT = 16;

        this.game.add.existing(this);
        this.anchor.setTo(0.5, 0.5);
        this.x = this.game.world.width / 2;
        this.y = this.game.world.height / 2;

        this.graphics = this.game.add.graphics();
        this.addChild(this.graphics);

        this.borders = [];
        this.cells = new CellList();
        for (let X = -Math.floor(this.WIDTH / 2); X < Math.ceil(this.WIDTH / 2); ++X) {
            for (let Y = -Math.floor(this.HEIGHT / 2); Y < Math.ceil(this.HEIGHT / 2); ++Y) {
                this.cells.add(new Cell(this, X, Y));
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

    clear() {
      this.cells.forEach((cell) => {
        cell.borders.forEach((b) => {b.destroy()});
        cell.setState();
        cell.direction = void 0;
      });
    }

    draw() {
      //this.graphics.clear();
      ////this.graphics.lineStyle(2, 0xdddddd);
      //this.graphics.beginFill(0xcccccc);
      //this.graphics.drawRect(this.SIZE * -.5, this.SIZE * -.5, this.SIZE, this.SIZE);
      //this.graphics.beginFill(0xff0000);
      //this.graphics.drawRect(0,0,5,5);
      //
      //this.graphics.beginFill(0xff0000);
      //this.graphics.drawRect(-150,-150,5,5);
      ////this.graphics.drawRect(0, 0, this.width, this.height);
      //this.graphics.endFill();
    }

    show() {
      //this.draw();
      let promise = [];
      this.cells.forEach((cell) => {
        promise.push(cell.show());
      });
      return Promise.all(promise);
    }

    setGenerator(generator) {
      if (this.generator) this.generator.destroy();
      this.generator = generator;
      this.generator.game = this.game;
      this.generator.level = this;
      this.generator.activate();
      //return this.generator.start();
    }

    update() {
        //console.log('d');
    }
}

class CellList extends CompositeMap {
    key(X, Y) {
        return X + ":" + Y;
    }

    add(cell) {
      this.$map[this.key(cell.X, cell.Y)] = cell;
      return this;
    }

    get(X, Y) {
      return this.$map[this.key(X, Y)];
    }
}

export {Level, CellList};
