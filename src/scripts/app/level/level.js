'use strict';

import Promise from 'bluebird';

import {Chunk} from 'app/level/region/chunk';
import {Room} from 'app/level/region/room';
import {CompositeMap} from 'app/util/composite-map';
import {CompositeMap2d} from 'app/util/composite-map-2d';

class Level extends Phaser.Group {
  constructor(...args) {
    super(...args);
    this.x = this.game.world.width / 2;
    this.y = this.game.world.height / 2;

    this.graphics = this.game.make.graphics();
    this.addChild(this.graphics);

    this.cells = new CompositeMap2d();
    this.rooms = new CompositeMap();
    this.chunks = new CompositeMap2d();
    //this.chunks = {};
  }

  get $add() {
    return {
      chunk: (...args) => {
        let chunk = new Chunk(this, ...args);
        this.cells.addAll(chunk.cells);
        this.chunks.put(chunk);
        this.add(chunk);
        return chunk;
      }
      , room: (...args) => {
        let room = new Room(this, ...args);
        this.rooms.put(room);
        this.add(room);
        return room;
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
