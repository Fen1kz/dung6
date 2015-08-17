import seedrandom from 'seedrandom';

class Random {
  init (game) {
    this.game = game;
    var qd = {};
    window.location.search.substr(1).split("&").forEach(function(item) {var k = item.split("=")[0], v = item.split("=")[1]; v = v && decodeURIComponent(v); (k in qd) ? qd[k].push(v) : qd[k] = [v]});
    this.game.seed = qd.seed[0];
    seedrandom(this.game.seed, {global: true});
    //let $seed = $('#seed');
    //$seed.val('test');
    //$seed.on('keyup', () => {
    //  this.game.seed = $seed.val();
    //  seedrandom(this.game.seed, {global: true});
    //});
    //$seed.trigger('keyup');
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
