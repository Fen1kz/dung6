'use strict';
import {Entity} from 'app/entities/entity';

class Player extends Entity {
  constructor(level, X, Y) {
    super(level, X, Y);
    this.setupControls();
    this.draw();
  }

  setupControls() {
    //this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    //  .isDown.add(() => {
    //    console.log('down');
    //  });
    //this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    //  .onDown.add(() => {this.game.camera.y -= 50;
    //    console.log(this.game.camera.x, this.game.camera.y)
    //  });
    //this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    //  .onDown.add(() => {this.game.camera.x -= 50;
    //    console.log(this.game.camera.x, this.game.camera.y)
    //  });
    //this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    //  .onDown.add(() => {this.game.camera.x += 50;
    //    console.log(this.game.camera.x, this.game.camera.y)
    //  });
  }

  move(movementObject, movementFn) {
    this.moving = true;
    this.game.add.tween(this)
      .to(movementObject, 200, Phaser.Easing.Linear.None, true)
      .onComplete.add(() => {
        this.moving = false;
      });
  }

  update() {
    if (!this.moving) {
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
        this.move({y: this.y + this.level.SIZE}, () => {
          this.Y++;
        });
      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        this.move({y: this.y - this.level.SIZE}, () => {
          this.Y--;
        });
      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        this.move({x: this.x - this.level.SIZE}, () => {
          this.X--;
        });
      }
      if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        this.move({x: this.x + this.level.SIZE}, () => {
          this.X++;
        });
      }
    }

    //console.log('update');
  }

  draw() {
    super.draw();
    this.graphics.lineStyle(2, 0xaaaaaa);
    //this.graphics.lineStyle(2, 0xdddddd);
    this.graphics.beginFill(0xff0000);
    this.graphics.drawCircle(this.level.SIZE * -.5, this.level.SIZE * -.5, this.level.SIZE);
    //this.graphics.drawRect(0, 0, this.width, this.height);
    this.graphics.endFill();
    return this;
  }

  render() {
    console.log('render');
  }
}

export {Player};



//setupControls() {
//this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
//  .onDown.add(() => {
//    this.game.camera.y += 50;
//    console.log(this.game.camera.x, this.game.camera.y)
//  });
//this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
//  .onDown.add(() => {this.game.camera.y -= 50;
//    console.log(this.game.camera.x, this.game.camera.y)
//  });
//this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
//  .onDown.add(() => {this.game.camera.x -= 50;
//    console.log(this.game.camera.x, this.game.camera.y)
//  });
//this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
//  .onDown.add(() => {this.game.camera.x += 50;
//    console.log(this.game.camera.x, this.game.camera.y)
//  });
//}
