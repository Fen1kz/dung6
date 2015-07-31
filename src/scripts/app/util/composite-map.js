import _ from 'lodash';

class CompositeMap {
    constructor() {
        this.$map = {};
    }
    key(key) {
        return key ? key.toString() : void 0;
    }
    put(key, value) {
        this.$map[this.key(key)] = value;
        return this;
    }
    get(key) {
        return this.$map[this.key(key)];
    }
    forEach(cb, $this) {
        _.forIn(this.$map, cb, $this);
        return this;
    }

    clone() {
      return _.cloneDeep(this);
    }

    toArray() {
      return _.values(this.$map);
    }

    get length() {
      return _.keys(this.$map).length;
    }
}

export {CompositeMap};
