import {CompositeMap} from 'app/util/composite-map';

class CompositeMap2d extends CompositeMap {
  put(X, Y, object) {
    (typeof this.$map.get(X) === 'object'
        ? this.$map.get(X).put(Y, object)
        : this.$map.put(X, new CompositeMap().put(Y, object))
    );
    return this;
  }

  get(X, Y) {
    return (typeof this.$map.get(X) === 'object'
      ? this.$map.get(X).get(Y)
      : undefined);
  }
}

export {CompositeMap2d};
