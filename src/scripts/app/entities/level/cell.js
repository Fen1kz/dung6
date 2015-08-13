'use strict';

import {Direction} from 'app/entities/level/directions';
import {CompositeMap} from 'app/util/composite-map';
import {Entity} from 'app/entities/entity';
import Promise from 'bluebird';

//const SHOW_ALPHA_SPEED = 500;
//const SHOW_SCALE_SPEED = 900;
const SHOW_ALPHA_SPEED = 500;
const SHOW_SCALE_SPEED = 500;

class Cell extends Entity {
  constructor(level, X, Y) {
    super(level, X, Y);

    this.cells = new CompositeMap();
    this.borders = new CompositeMap();

    this.setState(CellState.unknown);

    this.scale.setTo(.5, .5);
    this.alpha = 0;
    this.visible = false;

    //this.events.onInputDown.add(() => {
    //  //console.log(this.hide())
    //  this.hide()
    //    .delay(1000)
    //    .then(() => {
    //      return this.show();
    //    });
    //});
  }

  draw() {
    var style = {
      font: this.game.c.SIZE * .5 + "px Arial"
      //, fill: "#ff0044"
      , wordWrap: true
      , wordWrapWidth: this.width
      , align: "center"
    };

    var style2 = {
      font: this.game.c.SIZE * .3 + "px Arial"
      //, fill: "#ff0044"
      , wordWrapWidth: this.width
      , align: "center"
    };

    if (this.text)
      this.text.destroy();
    if (this.direction) {
      //console.log(this.direction.arrow);
      this.text = this.game.add.text(0, 0, this.direction.arrow, style);
      this.text.anchor.set(0.5);
      this.addChild(this.text);
    }

    if (this.numbers)
      this.numbers.destroy();
    this.numbers = this.game.add.text(0, 0, `${this.X}:${this.Y}`, style2);
    this.numbers.anchor.set(0.5, -.1);
    this.addChild(this.numbers);

    super.draw();
    this.graphics.lineStyle(2, 0xaaaaaa);
    //this.graphics.lineStyle(2, 0xdddddd);
    this.graphics.beginFill(this.state.color);
    this.graphics.drawRect(this.game.c.SIZE * -.5, this.game.c.SIZE * -.5, this.game.c.SIZE, this.game.c.SIZE);
    //this.graphics.drawRect(this.game.c.SIZE * -1, this.game.c.SIZE * -1, this.game.c.SIZE, this.game.c.SIZE);
    //this.graphics.drawRect(0, 0, this.width, this.height);
    this.graphics.endFill();
    return this;
  }

  show() {
    this.visible = true;
    //this.inputEnabled = true;
    let showAlpha = this.game.add.tween(this).to({alpha: 1}, SHOW_ALPHA_SPEED, Phaser.Easing.Quadratic.In, true);
    let showScale = this.game.add.tween(this.scale).to({x: 1, y: 1}, SHOW_SCALE_SPEED, Phaser.Easing.Elastic.InOut);
    return new Promise((resolve) => {
      showAlpha.chain(showScale);
      showScale.onComplete.add(() => {
        resolve();
      });
    });
  }

  hide() {
    let hideScale = this.game.add.tween(this.scale).to({
      x: .5,
      y: .5
    }, SHOW_SCALE_SPEED, Phaser.Easing.Elastic.Out, true);
    let hideAlpha = this.game.add.tween(this).to({alpha: 0}, SHOW_ALPHA_SPEED, Phaser.Easing.Quadratic.In);
    return new Promise((resolve) => {
      hideScale.chain(hideAlpha);
      hideAlpha.onComplete.add(() => {
        this.visible = false;
        this.inputEnabled = false;
        resolve();
      });
    });
  }

  directions() {
    return _.keys(this.cells.$map).map((d) => Direction.fromString(d));
  }

  directionTo(cell) {
    let direction;
    this.cells.forEach((c, d) => {
      if (c === cell) direction = d;
    });
    return Direction.fromString(direction);
  }

  setState(state) {
    this.state = _.clone(CellState[state]);
    this.draw();
    return this;
  }

  render() {
    console.log('r');
  }
}

let CellState = {
  undefined: {
    color: 0xcccccc
  }
  , placed: {
    color: 0xffffff
    , maze: true
    , walk: false
    , direction: void 0
  }
  , mark: {
    color: 0xffff00
    , walk: true
  }
  , walk: {
    color: 0xffaaaa
    , walk: true
  }
  , erased: {
    color: 0xaaaaff
    , walk: false
  }
};

export {Cell, CellState};
