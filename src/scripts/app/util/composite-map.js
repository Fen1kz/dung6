import _ from 'lodash';

class CompositeMap {
    constructor() {
        this.$map = {};
    }
    key(key) {
        return key.toString();
    }
    put(key, value) {
        this.$map[this.key(key)] = value;
        return this;
    }
    get(key) {
        return this.$map[this.key(key)];
    }
    forEach(cb, $this) {
        _.forIn(this.map, cb, $this);
        return this;
    }
}

export {CompositeMap};
