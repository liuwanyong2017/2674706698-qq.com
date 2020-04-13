//字典


class Dictionary {
    constructor(items) {
        this.items = items || {};
    }

    has(key) {
        return this.items.hasOwnProperty(key);
    }

    set(key, val) {
        this.items[key] = val;
    }

    remove(key) {
        if (!this.has(key)) return false;
        delete this.items[key];
        return true;
    }

    get(key) {
        if (!this.has(key)) return undefined;
        return this.items[key];
    }

    get keys() {
        return this.items && Object.keys(this.items);
    }

    get values() {
        return this.items && Object.values(this.items);
    }
    get size() {
        return this.keys.length;
    }
    clear() {
        return this.items = {};
    }
}


module.exports = {Dictionary}