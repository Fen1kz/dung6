/*
 * The `app` module
 * ============================================================================
 *
 * The module providing the main routine of the game application launch.
 */

// Import all declared states as an object.
import * as states from './app/states';
import Mazes from './app/states/Game.Mazes';


export default function () {
  let game = new Phaser.Game(600, 600, Phaser.AUTO);

  // Dynamically add all required game states.
  Object.keys(states)
    .map((key) => [ key, states[key] ])
    .forEach((args) => game.state.add(... args));

  game.state.add('Mazes', Mazes);

  game.state.start('Boot');


  //game.events.add('test', () => {
  //  console.log('test');
  //});

  return game;
}
