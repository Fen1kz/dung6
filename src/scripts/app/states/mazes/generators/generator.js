'use strict';

class Generator {
  constructor() {
    this.SPEED = 0;
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

  start() {
    $('#control')
      .text('Stop')
      .off('click.start')
      .on('click.stop', () => {
        console.log('stop');
        this.stop();
      });

    this.level.clear();
  }

  stop() {
    this.stopFlag = true;
  }

  off() {

  }

  stopped() {
    this.stopFlag = false;
    this.on();
  }

  loop(fn, args, number = 0) {
    return fn.apply(this, args)
      .delay(this.SPEED)
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
