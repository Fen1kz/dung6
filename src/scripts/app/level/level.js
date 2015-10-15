'use strict';

import Promise from 'bluebird';

import {Chunk} from 'app/objects/chunk';
import {Cell} from 'app/entities/level/cell';
import {Directions as Dir} from 'app/entities/level/directions';
import {CompositeMap2d} from 'app/util/composite-map-2d';

class Level extends Phaser.Group {
  constructor(...args) {
    super(...args);
    this.x = this.game.world.width / 2;
    this.y = this.game.world.height / 2;

    this.graphics = this.game.make.graphics();
    this.addChild(this.graphics);

    //this.cells = new CompositeMap2d();
    this.rooms = new CompositeMap();
    this.chunks = new CompositeMap2d();
    //this.chunks = {};
  }

  get $add() {
    return {
      chunk: (X, Y) => {
        let chunk = new Chunk(this, X, Y);
        this.chunks.put(chunk);
        this.add(chunk);
        return chunk;
      }
      , room: (X, Y) => {
        let room = new Room(this, X, Y);
        this.rooms.put(room);
        this.add(chunk);
        return chunk;
      }
    }
  }

  clear() {
  }

  show() {
    let promise = [];
    this.cells.forEach((cell) => {
      promise.push(cell.show());
    });
    return Promise.all(promise);
  }
}

export {Level};
