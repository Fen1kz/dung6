import {Level} from 'app/objects/level';
import {Wilson} from 'app/objects/mazes/generators/wilson';
import {Cell} from 'app/entities/level/cell';
import {Player} from 'app/entities/player';

import seedrandom from 'seedrandom';

export default class Mazes extends Phaser.State {
    preload() {
      let $seed = $('#seed');
      $seed.val('test');
      $seed.on('keyup', () => {
        this.game.seed = $seed.val();
        seedrandom(this.game.seed, { global: true });
      });
      $seed.trigger('keyup');
    }

    create() {
        this.game.world.setBounds(0, 0, 1800, 1800);
        if (this.game.camera.bounds) {
          //  The Camera can never be smaller than the game size
          this.game.camera.bounds.setTo(0, 0, 1800, 1800);
        }
        this.game.stage.backgroundColor = 0xfefefe;

        //console.log(this.game.camera);
        //console.log(`this.camera.x (${this.game.camera.x}) = this.game.world.width / 2 (${this.game.world.width / 2}) - this.game.camera.screenView.width / 2 (${this.game.camera.screenView.width / 2})`)
        //console.log(`this.game.world.width / 2 - this.game.camera.screenView.width / 2 (${this.game.world.width / 2 - this.game.camera.screenView.width / 2})`)
        this.game.camera.x = this.game.world.width / 2 - this.game.camera.screenView.width / 2;
        this.game.camera.y = this.game.world.height / 2 - this.game.camera.screenView.height / 2;
        //this.game.camera.x = 50;
        //this.game.camera.y = 0;

        this.level = new Level(this.game);
        //console.log(this.level.x, this.level.y);

        this.level.show()
          .bind(this)
          .then(() => {
            //console.log('level show');
            //console.log(this.game.camera.x, this.game.camera.y)
            //console.log(`this.camera.x (${this.game.camera.x}) = this.game.world.width / 2 (${this.game.world.width / 2}) - this.game.camera.screenView.width / 2 (${this.game.camera.screenView.width / 2})`)
            //console.log(`this.game.world.width / 2 - this.game.camera.screenView.width / 2 (${this.game.world.width / 2 - this.game.camera.screenView.width / 2})`)
            //let x = this.game.world.width / 2 - this.game.camera.screenView.width / 2;
            //let y = this.game.world.height / 2 - this.game.camera.screenView.height / 2;
            ////this.game.camera.position.setTo(x, y)
            //this.game.camera.x = x;
            //this.game.camera.y = y;
            //
            //console.log(x, y, this.game.camera.x, this.game.camera.y)
          })
          .then(() => {
            this.level.setGenerator(new Wilson());
            return this.level.generator.start();
          })
          .then(() => {
            console.log('generation stopped');
          })
          .then(() => {
            this.player = new Player(this.level, 0, 0);
          });
    }

    update() {
        this.move_camera_by_pointer(this.game.input.mousePointer);
        this.move_camera_by_pointer(this.game.input.pointer1);

      if (this.player)
        this.player.update();
    }

    render() {
        //var pos = this.game.input.activePointer.position;
        var pos = this.game.camera;
        this.game.debug.text("x:" + pos.x + " y:" + pos.y, this.game.width / 2, this.game.height / 2);
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
