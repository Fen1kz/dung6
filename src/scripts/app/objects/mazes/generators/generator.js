'use strict';

import Promise from 'bluebird';

class Generator {
  constructor(game, options) {
    this.SPEED = 0;
    this.game = game;
    this.activate();
  }

  activate() {
    this.on();
  }

  on() {
    $('#control')
      .text('Start')
      .off('click.stop')
      .on('click.start', () => {
        console.log('start');
        this.start();
      });
  }

  start(cells) {
    $('#control')
      .text('Stop')
      .off('click.start')
      .on('click.stop', () => {
        console.log('stop');
        this.stop();
      });

    this.cells = cells;
  }

  stop() {
    this.stopFlag = true;
  }

  stopped() {
    this.stopFlag = false;
    this.on();
  }

  loop(fn, args, number = 0) {
    return fn.apply(this, args)
      .then((x) => {
        return (this.SPEED == 0
            ? Promise.resolve(x)
            : Promise.resolve(x).delay(this.SPEED)
        );
      })
      //.tap((data) => {debugger;})
      .then((retObject) => {
        if (retObject.result === false
          && number !== 1
          && !this.stopFlag) {
          return this.loop(fn, retObject.args, --number);
        }
      });
  }

  deactivate() {

  }

  destroy() {
    this.deactivate();
  }
}

export {Generator};
