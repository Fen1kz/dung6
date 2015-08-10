'use strict';

class Entity extends Phaser.Sprite {
  constructor(level, X, Y) {
    super(level.game, X, Y);

    this.level = level;
    this.level.addChild(this);
    this.X = X;
    this.Y = Y;

    this.anchor.setTo(0.5, 0.5);
    this.x = this.level.SIZE / 2 + this.X * this.level.SIZE;
    this.y = this.level.SIZE / 2 + this.Y * this.level.SIZE;
    //this.x = this.X * this.level.SIZE;
    //this.y = this.Y * this.level.SIZE;

    this.game = this.level.game;
    this.anchor.setTo(0.5, 0.5);

    this.graphics = this.game.add.graphics();
    this.addChild(this.graphics);
  }

  draw() {
    this.graphics.clear();
    return this;
  }
}

export {Entity};
