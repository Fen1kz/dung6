'use strict';

import {CompositeMap} from 'app/util/composite-map';
import Promise from 'bluebird';
class Cell extends Phaser.Sprite {
  constructor(level, X, Y) {
    super(level.game);

    this.level = level;
    this.X = X;
    this.Y = Y;

    this.cells = new CompositeMap();

    this.x = this.X * this.level.SIZE;
    this.y = this.Y * this.level.SIZE;

    this.anchor.setTo(0.5, 0.5);
    var graphics = this.game.add.graphics();
    graphics.lineStyle(2, 0xaaaaaa);
    //graphics.lineStyle(2, 0xdddddd);
    graphics.beginFill(0xeeeeee);
    graphics.drawRect(this.level.SIZE * -.5, this.level.SIZE * -.5, this.level.SIZE, this.level.SIZE);
    //graphics.drawRect(0, 0, this.width, this.height);
    graphics.endFill();

    this.scale.setTo(.5, .5);
    this.alpha = 0;
    this.visible = false;

    this.addChild(graphics);

    this.level = level;
    this.level.addChild(this);

    this.events.onInputDown.add(() => {
      //console.log(this.hide())
      this.hide()
        .delay(1000)
        .then(() => {
          return this.show();
        });
    });
  }

  show() {
    this.visible = true;
    this.inputEnabled = true;
    let showAlpha = this.game.add.tween(this).to({alpha: 1}, 500, Phaser.Easing.Quadratic.In, true);
    let showScale = this.game.add.tween(this.scale).to({x: 1, y: 1}, 900, Phaser.Easing.Elastic.InOut);
    return new Promise((resolve) => {
      showAlpha.chain(showScale);
      showScale.onComplete.add(() => {
        resolve();
      });
    });
  }

  hide() {
    let hideScale = this.game.add.tween(this.scale).to({x: .5, y: .5}, 900, Phaser.Easing.Elastic.Out, true);
    let hideAlpha = this.game.add.tween(this).to({alpha: 0}, 500, Phaser.Easing.Quadratic.In);
    return new Promise((resolve) => {
      hideScale.chain(hideAlpha);
      hideAlpha.onComplete.add(() => {
        this.visible = false;
        this.inputEnabled = false;
        resolve();
      });
    });
  }

  render() {
    console.log('r');
  }
}

export {Cell};
