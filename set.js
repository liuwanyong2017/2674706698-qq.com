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
//差集：
    deference(set) {
        const res = new Set();
        this.values().map(
            val => !set.has(val) && res.add(val)
        );
        return res;
    }
}

const set = new Set({a: "a"});

set.add(2);
set.add("b");
set.add("3");
console.log(
    set, set.has("2"),
    set.remove(3),
    set.size(),
    set.values()
);

//并集的操作 a U b , 元素存于a or 元素存于b:


class Union extends Set {
    constructor(arr, initData) {
        super(initData);
        if (!Array.isArray(arr) || arr.find(
            item => !(item instanceof Set)
        )) {
            throw new Error("Union 必须要接收一个Set类组成的数组参数！");
        }
        this.init(arr);
    }

    init(arr) {
        arr.map(
            list => {
                if (list instanceof Set) {
                    const isEmpty = this.size() === 0;
                    list.values().map(
                        val => isEmpty ? this.add(val) :
                            !this.has(val) && this.add(val)
                    );
                }
            }
        );
    }
}

const set1 = new Set({
    a: "a", b: "b", c: "c", 4: 4, 6: "6"
});
const set2 = new Set({
    b: "b", c: "c", 4: "4", 7: "7", l: "l"
});
const union = new Union([set1, set2], {7: 7});
console.log(union);


// 交集
class Intersection extends Set {
    constructor(set1, set2) {
        super();
        if (!set instanceof Set || !set2 instanceof Set) {
            throw new Error("构造函数需要接受两个Set类！");
        }
        this.init(set1, set2);
    }

    init(set1, set2) {
        set1.values().map(
            val => set2.has(val) && this.add(val)
        );
    }
}

const intersection = new Intersection(set1, set2);
console.log(intersection);



const difference = set2.deference(set1)
console.log(difference);