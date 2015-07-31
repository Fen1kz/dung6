'use strict';

class Generator {
  start() {

  }

  stop() {

  }

  loop(fn, args, number = 0) {
    return fn.apply(this, args)
      .delay(this.SPEED)
      //.tap((data) => {debugger;})
      .then((retObject) => {
        if (retObject.result === false && number !== 1) {
          return this.loop(fn, retObject.args, --number);
        }
      });
  }
}

export {Generator};
