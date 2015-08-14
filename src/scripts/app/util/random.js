import seedrandom from 'seedrandom';

class Random {
  init (game) {
    this.game = game;
    let $seed = $('#seed');
    $seed.val('test');
    $seed.on('keyup', () => {
      this.game.seed = $seed.val();
      seedrandom(this.game.seed, {global: true});
    });
    $seed.trigger('keyup');
  }

  sample(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  include(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }
}

let instance = new Random();

export {instance as Random};
