import {Level} from 'app/states/mazes/level';
import {Wilson} from 'app/states/mazes/generators/wilson';
import {Cell} from 'app/entities/level/cell';

export default class Mazes extends Phaser.State {
    preload() {
      console.log('hi')
    }

    create() {
        this.o_mcamera;

        this.game.world.setBounds(-200, -200, 400, 400);
        this.game.stage.backgroundColor = 0xfefefe;

        //console.log(this.game.camera);
        console.log(`this.camera.x (${this.game.camera.x}) = this.game.world.width / 2 (${this.game.world.width / 2}) - this.game.camera.screenView.width / 2 (${this.game.camera.screenView.width / 2})`)
        console.log(`this.game.world.width / 2 - this.game.camera.screenView.width / 2 (${this.game.world.width / 2 - this.game.camera.screenView.width / 2})`)
        //this.game.camera.x = this.game.world.width / 2 - this.game.camera.screenView.width / 2;
        //this.game.camera.y = this.game.world.height / 2 - this.game.camera.screenView.height / 2;
        //this.game.camera.x = 50;
        //this.game.camera.y = 0;
        console.log(this.game.camera.x, this.game.camera.y)

        this.level = new Level(this.game);
        ////console.log(this.level.x, this.level.y);

        this.level.show()
          .then(() => {
            console.log('all done');
            this.level.setGenerator(new Wilson());

            setTimeout(() => {
              this.level.generator.stop()
            }, 2000);

            return this.level.generator.start();
          })
          .then(() => {
            console.log('generation stopped');
          });

      this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
        .onDown.add(() => {
          this.game.camera.y -= 50;
          console.log(this.game.camera.x, this.game.camera.y)
        });
      this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
        .onDown.add(() => {this.game.camera.y += 50
          console.log(this.game.camera.x, this.game.camera.y)
        });
      this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(() => {this.game.camera.x -= 50
          console.log(this.game.camera.x, this.game.camera.y)
        });
      this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(() => {this.game.camera.x += 50
          console.log(this.game.camera.x, this.game.camera.y)
        });
    }

    update() {
        this.move_camera_by_pointer(this.game.input.mousePointer);
        this.move_camera_by_pointer(this.game.input.pointer1);
    }

    render() {
        //var pos = this.game.input.activePointer.position;
        var pos = this.game.camera;
        this.game.debug.text("x:" + pos.x + " y:" + pos.y, 180, 200);
    }

    move_camera_by_pointer(o_pointer) {
        if (!o_pointer.timeDown) {
            return;
        }
        if (o_pointer.isDown && !o_pointer.targetObject) {
            if (this.o_mcamera) {
                this.game.camera.x += this.o_mcamera.x - o_pointer.position.x;
                this.game.camera.y += this.o_mcamera.y - o_pointer.position.y;
            }
            this.o_mcamera = o_pointer.position.clone();
        }
        if (o_pointer.isUp) {
            this.o_mcamera = null;
        }
    }
}
