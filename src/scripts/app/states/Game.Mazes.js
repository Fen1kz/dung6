import {Random} from 'app/util/random';
import {Level} from 'app/objects/level';
import {Room} from 'app/objects/room';
import {Wilson} from 'app/objects/mazes/generators/wilson';
import {WilsonWalls} from 'app/objects/mazes/generators/wilson-walls';
import {Cell} from 'app/entities/level/cell';
import {Border} from 'app/entities/level/border';
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
        //let safeDistance = Math.floor(Room.config.side.max / 2);
        //cells = Room.shrinkTo(cells, _.values(d), safeDistance);
        //cells.forEach((cell) => {
        //  cell.setState('placed');
        //});

        let rooms = [];
        for (let i = 0; i < 111; ++i) {
          let room = new Room(this.level);
          rooms.push(room);
          console.log('room generated', room.size);
          let avaliableCells = Room.shrinkTo(cells, d.N, Math.abs(room.size.side2.min));
          avaliableCells = Room.shrinkTo(avaliableCells, d.W, Math.abs(room.size.side1.min));
          avaliableCells = Room.shrinkTo(avaliableCells, d.S, Math.abs(room.size.side2.max) - 1);
          avaliableCells = Room.shrinkTo(avaliableCells, d.E, Math.abs(room.size.side1.max) - 1);

          rooms.forEach((r) => {
            let wastedCells = Room.expandTo(r.cells, d.N, Math.abs(room.size.side2.max));
            wastedCells = Room.expandTo(wastedCells, d.W, Math.abs(room.size.side1.max));
            wastedCells = Room.expandTo(wastedCells, d.S, Math.abs(room.size.side2.min) + 1);
            wastedCells = Room.expandTo(wastedCells, d.E, Math.abs(room.size.side1.min) + 1);
            avaliableCells = _.without.apply(_, [avaliableCells].concat(wastedCells));
          });

          avaliableCells.forEach((cell) => {
            cell.setState('placed');
          });

          if (avaliableCells.length == 0) {
            break;
          }

          let cell = Random.sample(avaliableCells);
          room.generate(cell);

          cells = _.without.apply(_, [cells].concat(room.cells));

          cells.forEach((cell) => {
            cell.setState();
          });
        }

        //chunk.cells.forEach((cell) => {
        //  cell.setState('placed');
        //});

        rooms.forEach((r) => {
          r.cells.forEach((cell) => {
            //cell.state.color = cell === r.center ? 0xFF0000 : 0xFF9999;
            //cell.draw();
            cell.setState('placed');
          });

          _.values(d).forEach((d) => {
            Room
              //.getSide(r.cells, _.values(d))
              .getSide(r.cells, d)
              .forEach((cell) => {
                if (cell.cells.get(d)) new Border(cell, cell.cells.get(d));
                //cell.state.color = 0xFF9999;
                //cell.draw();
              });
          })
        });

        this.level.rooms = rooms;
      })
      .then(() => {
        let generator = new Wilson(this.game);
        console.log(this.level.rooms)
        let roomCells = _.reduce(this.level.rooms, (result, room) => result.concat(room.cells), []);
        //console.log(roomCells.length, roomCells);
        let cells = _.without.apply(_, [this.level.cells.toArray()].concat(roomCells));
        cells.forEach((cell) => {
          cell.state.color = 0x00FF00;
          cell.draw();
        });
        return generator.start(cells);
        //return generator.start(this.);
      })
      .then(() => {
        console.log('generation stopped');
      })
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
