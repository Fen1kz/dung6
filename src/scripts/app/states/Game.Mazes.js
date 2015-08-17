import {Random} from 'app/util/random';
import {Level} from 'app/objects/level';
import {Room} from 'app/objects/room';
import {Wilson} from 'app/objects/mazes/generators/wilson';
import {WilsonWalls} from 'app/objects/mazes/generators/wilson-walls';
import {Cell} from 'app/entities/level/cell';
import {Directions as d} from 'app/entities/level/directions';
import {Player} from 'app/entities/player';

export default class Mazes extends Phaser.State {
  preload() {
    Random.init(this.game)
  }

  create() {
    this.game.world.setBounds(0, 0, 1800, 1800);
    if (this.game.camera.bounds) {
      //  The Camera can never be smaller than the game size
      this.game.camera.bounds.setTo(0, 0, 1800, 1800);
    }
    this.game.stage.backgroundColor = 0xfefefe;

    this.game.camera.x = this.game.world.width / 2 - this.game.camera.screenView.width / 2;
    this.game.camera.y = this.game.world.height / 2 - this.game.camera.screenView.height / 2;

    this.level = new Level(this.game);
    this.game.add.existing(this.level);
    let chunk = this.level.chunk(0, 0);
    this.level.show()
      .bind(this)
      .then(() => {
        let cells = chunk.cells.toArray();
        let safeDistance = Math.floor(Room.config.side.max / 2);
        cells = Room.shrinkTo(cells, _.values(d), safeDistance);
        cells.forEach((cell) => {
          cell.setState('placed');
        });

        let rooms = [];
        for (let i = 0; i < 3 && cells.length > 0; ++i) {
          let cell = Random.sample(cells);
          let room = new Room(level);
          rooms.push(room);
          room.generate();

          let wasted = Room.expandTo(room.cells, _.values(d), safeDistance);
          cells = _.without.apply(_, [cells].concat(wasted));

          wasted.forEach((cell) => {
            if (!_.find(room.cells, cell)) {
              //cell.state.color = 0x0000FF;
              //cell.draw();
              cell.setState();
            }
          });
        }

        rooms.forEach((r) => {
          r.cells.forEach((c) => {
            c.state.color = 0xFF9999;
            c.draw();
          })
        });
      });
      //.then(() => {
      //  let generator = new Wilson(this.level);
      //  return generator.start();
      //})
      //.then(() => {
      //  console.log('generation stopped');
      //})
      //.then(() => {
      //  this.player = new Player(
      //    this.level
      //    , this.level.chunks.get(0, 0).MAXX
      //    , this.level.chunks.get(0, 0).MAXY
      //  );
      //});
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
