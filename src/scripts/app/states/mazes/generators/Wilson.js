'use strict';

import Promise from 'bluebird';
import _ from 'lodash';

import {Generator} from 'app/states/mazes/generators/generator'
import {CellState} from 'app/entities/level/cell'
import {Border} from 'app/entities/level/border'
import {Direction} from 'app/entities/level/directions'

class Wilson extends Generator {
  constructor(options) {
    super();
    this.walkToTarget = Promise.method(this.$walkToTarget).bind(this);
    this.walk = Promise.method(this.$walk).bind(this);

    if (options && options.firstFn) {
      this.firstFn = options.firstFn;
    } else {
      this.firstFn = (cells) => {
        return cells.shift();
      }
    }
    this.INITIAL_WALK_FACTOR = 20;
    this.cells = [];
    this.path = [];
  }

  start() {
    super.start();
    this.cells = this.level.cells.toArray();

    let target = this.firstFn(this.cells)
      .setState('mark');

    this.path = [target];

    return this.loop(this.walk, [target], Math.max(2, Math.floor(this.cells.length / this.INITIAL_WALK_FACTOR)))
      .then(() => this.makeCellsPlaced())
      .then(() =>
        this.loop(() =>
          this.walkToTarget()
            .then(() => {
              return {
                result: this.cells.length < 1
              };
            })))
      .then(() => {
        this.stopped();
      });
    //return this.loop(this.walk, [target], Math.floor(this.cells.length / this.INITIAL_WALK_FACTOR))
    //  .then(() => {
    //    return this.makeCellsPlaced();
    //  })
    //  .then(() => {
    //    return this.loop(() => {
    //      return this.walkToTarget()
    //        .then(() => {
    //          return {
    //            result: this.cells.length < 1
    //          }
    //        })
    //    });
    //  });
  }

  $walk(next, direction) {
    // get directions names list
    let directions = next.directions();

    // remove previous direction
    //console.log('pre-filter', direction, directions);
    if (direction) {
      _.remove(directions, (d) => d == direction.opposite());
    }
    //console.log('post-filter', directions);

    // get new direction
    direction = _.sample(directions);

    next.direction = direction;
    next.draw();
    //console.log(next.X, next.Y, 'going to', direction);
    next = next.cells.get(direction);
    //console.log('went', next.walk);

    if (next.state.maze) {
      this.makeCellsPlaced();
      return {
        result: true
      }
    }

    if (next.state.walk) {
      this.eraseWalk(next);
      return {
        result: false
        , args: [next]
      };
    }

    if (next.direction) delete next.direction;
    next.setState('walk');
    this.path.push(next);

    return {
      result: false
      , args: [next, direction]
    };
  }

  $walkToTarget() {
    let next = this.firstFn(this.cells);
    if (next) {
      next.setState('mark');

      this.path = [next];

      return this.loop(this.walk, [next]);
    } else {
      return true;
    }
  }


  eraseWalk(next) {
    while (this.path.length) {
      let cell = this.path.pop();
      cell.setState('erased');
      if (cell === next) {
        cell.setState('walk');
        this.path.push(next);
        return;
      }
    }
  }

  makeCellsPlaced() {
    for (let i = 0; i < this.path.length; ++i) {
      let prev = (i > 0) ? this.path[i - 1] : void 0;
      let cell = this.path[i];
      let next = cell.cells.get(cell.direction);

      let directions = cell.directions();
      let antiDirections =
        [cell.directionTo(prev), cell.directionTo(next)]
          .filter(ad => ad !== void 0);

      antiDirections.forEach(ad => {
        _.remove(directions, (d) => d === ad);
        if (cell.cells.get(ad) && cell.borders.get(ad)) {
          cell.borders.get(ad).destroy();
        }
      });

      directions.map((d) => {
        if (!cell.borders.get(d))
          new Border(cell, cell.cells.get(d));
      });

      _.remove(this.cells, (c) => c === cell);
      cell.direction = void 0;
      cell.setState('placed');

      //this.game.draw();
      //debugger;
    }
    this.path = [];
  }
}

export {Wilson};
