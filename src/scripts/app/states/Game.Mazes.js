import {Level} from 'app/states/mazes/level';
import {Wilson} from 'app/states/mazes/generators/wilson';
import {Cell} from 'app/entities/level/cell';

export default class Mazes extends Phaser.State {
    preload() {
      console.log('hi')
    }

    create() {
        this.o_mcamera;

        this.game.world.setBounds(0, 0, 1200, 900);
        this.game.stage.backgroundColor = 0xffffff;

        //console.log(this.game.camera);
        this.game.camera.x = this.game.world.width * .5 - this.game.camera.screenView.width * .5;
        this.game.camera.y = this.game.world.height * .5 - this.game.camera.screenView.width * .5;

        this.level = new Level(this.game);
        this.level.x = this.game.world.width * .5;
        this.level.y = this.game.world.height * .5;
        //console.log(this.level);
        this.game.add.existing(this.level);

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
        //this.level.generate(
        //    new Wilson(this.game)
        //);
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
