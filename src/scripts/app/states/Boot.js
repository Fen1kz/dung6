/*
 * Boot state
 * ===========================================================================
 *
 * The first state of the game, responsible for setting up some Phaser
 * features.
 */

import assets from '../data/assets';

export default class Boot extends Phaser.State {

  init() {
    // Point the Phaser Asset Loader to where all your assets live.
    this.load.baseURL = './assets/';

    // Initialize physics engines here.
    //this.physics.startSystem(Phaser.Physics.ARCADE);

    this.gameSetup();
  }

  preload() {
    // Load the required assets to display our splash screen, later.
    this.load.pack('boot', null, assets);
  }

  create() {
    // Immediately after loading the boot assets, go to the next game state.
    this.state.start('Preload');
  }

  // --------------------------------------------------------------------------

  // Use this method to adjust the game appearance, number of input pointers,
  // screen orientation handling etc.
  gameSetup() {
    this.input.maxPointers = 2;

    this.scale.pageAlignHorizontally = true;
    this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;

    this.stage.disableVisibilityChange = true;
    this.stage.smoothed = true;

    this.game.c = {
      SIZE: 8
      , styles: {cell: {}}
    };
    this.game.c.styles.cell.center = {
      font: this.game.c.SIZE * .5 + "px Arial"
      , wordWrap: true
      , wordWrapWidth: this.width
      , align: "center"
    };

    this.game.c.styles.cell.debug = {
      font: this.game.c.SIZE * .3 + "px Arial"
      , wordWrapWidth: this.width
      , align: "center"
    };
  }

}
