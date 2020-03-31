//集合

class Set {
    constructor(items = {}) {
        this.items = items;
    }

    has(val) {
        //数字或者字符串强制转化为字符串了，，，
        return this.items.hasOwnProperty(val);
    }

    add(val) {
        return this.has(val) ? false : this.items[val] = val;
    }

    remove(val) {
        return this.has(val) ?
            delete this.items[val] : false;
    }

    size() {
        return Object.keys(this.items).length;
    }

    clear() {
        return this.items = {};
    }

    values() {
        return Object.keys(this.items).map(
            key => this.items[key]
        );
    }
}

const set = new Set({a: "a"});

set.add(2);
set.add("b");
set.add("3");
console.log(
    set, set.has('2'),
    set.remove(3),
    set.size(),
    set.values()
);