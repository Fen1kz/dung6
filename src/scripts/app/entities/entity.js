'use strict';

class Entity extends Phaser.Sprite {
  constructor(level, X, Y) {
    super(level.game, X, Y);

    this.level = level;
    this.level.addChild(this);
    this.X = X;
    this.Y = Y;

    this.anchor.setTo(0.5, 0.5);
    //this.x = this.game.c.SIZE / 2 + this.X * this.game.c.SIZE;
    //this.y = this.game.c.SIZE / 2 + this.Y * this.game.c.SIZE;
    this.x = this.X * this.game.c.SIZE;
    this.y = this.Y * this.game.c.SIZE;

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
