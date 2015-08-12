'use strict';
import _ from 'lodash';
import {Entity} from 'app/entities/entity';
import {Directions as d} from 'app/entities/level/directions';

class Player extends Entity {
  constructor(level, X, Y) {
    super(level, X, Y);
    this.setControls();
    this.draw();
  }

  movementMap() {
    return [{
      key: Phaser.Keyboard.UP
      , direction: d.N
      , xy: (o, x, y, v) => {
        o[y] -= v;
        return o;
      }
    }, {
      key: Phaser.Keyboard.RIGHT
      , direction: d.E
      , xy: (o, x, y, v) => {
        o[x] += v;
        return o;
      }
    }, {
      key: Phaser.Keyboard.DOWN
      , direction: d.S
      , xy: (o, x, y, v) => {
        o[y] += v;
        return o;
      }
    }, {
      key: Phaser.Keyboard.LEFT
      , direction: d.W
      , xy: (o, x, y, v) => {
        o[x] -= v;
        return o;
      }
    }]
  }

  setControls() {
    let controls = [];
    this.movementMap().forEach((movObj) => {
      controls.push(() => {
        if (!this.moving) {
          if (this.game.input.keyboard.isDown(movObj.key)) {
            this.move(movObj);
          }
        }
      });
    });

    this.updateControls = () => {
      for (let i = 0; i < 4; ++i) {
        controls[i]();
      }
    };
  }

  move(movObj) {
    if (
      !this.getCell().borders.get(movObj.direction)
      && this.getCell().cells.get(movObj.direction)
    ) {
      this.moving = true;
      this.game.add.tween(this)
        .to(
        movObj.xy({x: this.x, y: this.y}, 'x', 'y', this.game.c.SIZE)
        , 200
        , Phaser.Easing.Linear.None
        , true)
        .onComplete.add(() => {
          movObj.xy(this, 'X', 'Y', 1);
          this.moving = false;
        });
    }
  }

  update() {
    this.updateControls();
  }

  draw() {
    super.draw();
    this.graphics.lineStyle(2, 0xaaaaaa);
    //this.graphics.lineStyle(2, 0xdddddd);
    this.graphics.beginFill(0xff0000);
    this.graphics.drawCircle(0, 0, .75 * this.game.c.SIZE);
    //this.graphics.drawRect(0, 0, this.width, this.height);
    this.graphics.endFill();
    return this;
  }

  render() {
    console.log('render');
  }

  getCell() {
    return this.level.cells.get(this.X, this.Y);
  }
}

export {Player};
