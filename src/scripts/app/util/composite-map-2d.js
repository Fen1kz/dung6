import {CompositeMap} from 'app/util/composite-map';

class CompositeMap2d extends CompositeMap {
  key(X, Y) {
    return X + ":" + Y;
  }

  add(cell) {
    this.$map[this.key(cell.X, cell.Y)] = cell;
    return this;
  }

  get(X, Y) {
    return this.$map[this.key(X, Y)];
  }
}

export {CompositeMap2d};
